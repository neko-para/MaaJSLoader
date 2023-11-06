import type { InvokeClient, InvokeServer, PostClient, PostServer } from './types'

export function directAdapter(): [InvokeServer & PostClient, InvokeClient & PostServer] {
  const invokes: Record<string, (arg: Uint8Array, id?: string) => Promise<Uint8Array | null>> = {}
  const posts: Record<string, (arg: Uint8Array, id?: string) => void> = {}

  return [
    {
      handle(msg, func) {
        invokes[msg] = func
      },
      post(msg, arg, id) {
        posts[msg]?.(arg, id)
      }
    },
    {
      invoke(msg, arg, id) {
        return invokes[msg]?.(arg, id)
      },
      on(msg, func) {
        posts[msg] = func
      }
    }
  ]
}

export function streamAdapterBackend(
  send: (msg: string, arg: Uint8Array, id?: string) => void
): [
  (msg: string, arg: Uint8Array, id?: string) => Promise<Uint8Array | null>,
  InvokeServer & PostClient
] {
  const invokes: Record<string, (arg: Uint8Array, id?: string) => Promise<Uint8Array | null>> = {}

  const server: InvokeServer & PostClient = {
    handle(msg, func) {
      invokes[msg] = func
    },
    post(msg, arg, id) {
      send(msg, arg, id)
    }
  }

  return [
    async (msg, arg, id) => {
      return (await invokes[msg]?.(arg, id)) ?? null
    },
    server
  ]
}

export function streamAdapterFrontend(
  invoke: (msg: string, arg: Uint8Array, id?: string) => Promise<Uint8Array | null>
): [(msg: string, arg: Uint8Array, id?: string) => void, InvokeClient & PostServer] {
  const posts: Record<string, (arg: Uint8Array, id?: string) => void> = {}

  const client: InvokeClient & PostServer = {
    invoke(msg, arg, id) {
      return invoke(msg, arg, id)
    },
    on(msg, func) {
      posts[msg] = func
    }
  }

  return [
    async (msg, arg, id) => {
      posts[msg]?.(arg, id)
    },
    client
  ]
}
