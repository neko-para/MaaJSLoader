import type {
  InvokeClient,
  PostServer,
  ServiceDefinition,
  TranslateAllRpc,
  TranslateAllService
} from './types'

export class Frontend {
  counter: number
  adapter: InvokeClient & PostServer
  streaming: Record<number, [(data: Uint8Array) => Promise<void>, () => void]>
  client: Record<string, (...args: any) => any>

  constructor(adapter: InvokeClient & PostServer) {
    this.counter = 1
    this.adapter = adapter
    this.streaming = {}
    this.client = {}
  }

  init() {
    this.adapter.on('$stream', async (arg, id) => {
      if (id! in this.streaming) {
        await this.streaming[id!][0](arg)
      }
    })
    this.adapter.on('$close', async (arg, id) => {
      if (id! in this.streaming) {
        this.streaming[id!][1]()
        delete this.streaming[id!]
      }
    })
  }

  cast_client<Definition>() {
    return this.client as TranslateAllService<Definition>
  }

  add_all(definitions: Record<string, ServiceDefinition>) {
    for (const key of Object.keys(definitions)) {
      this.add(key, definitions[key])
    }
  }

  add(name: string, definition: ServiceDefinition) {
    for (const method in definition) {
      const key = `${name}.${method}`
      const defs = definition[method]
      if (!defs.requestStream) {
        if (!defs.responseStream) {
          this.client[key] = async arg => {
            const result = await this.adapter.invoke(key, defs.request.fromObject(arg).serialize())
            return result ? defs.response.deserialize(result).toObject() : null
          }
        } else {
          this.client[key] = async (arg, out) => {
            const id = this.counter
            this.counter += 1
            this.streaming[id] = [
              async data => {
                out(defs.response.deserialize(data).toObject())
              },
              () => {
                out(null)
              }
            ]
            await this.adapter.invoke(key, defs.request.fromObject(arg).serialize(), id)
          }
        }
      } else {
        if (!defs.responseStream) {
          this.client[key] = async out => {
            const id = this.counter
            this.counter += 1
            this.adapter.invoke(key, new Uint8Array(), id).then(result => {
              if (result) {
                out(defs.response.deserialize(result).toObject())
              } else {
                out(null)
              }
            })
            return async (msg: any) => {
              if (msg === null) {
                await this.adapter.invoke('$close', new Uint8Array(), id)
              } else {
                await this.adapter.invoke('$stream', defs.request.fromObject(msg).serialize(), id)
              }
            }
          }
        } else {
          this.client[key] = async (arg, out) => {
            const id = this.counter
            this.counter += 1
            this.streaming[id] = [
              async data => {
                out(defs.response.deserialize(data).toObject())
              },
              () => {
                out(null)
              }
            ]
            await this.adapter.invoke(key, defs.request.fromObject(arg).serialize(), id)
            return async (msg: any) => {
              if (msg === null) {
                await this.adapter.invoke('$close', new Uint8Array(), id)
              } else {
                await this.adapter.invoke('$stream', defs.request.fromObject(msg).serialize(), id)
              }
            }
          }
        }
      }
    }
  }
}
