import type { CustomActionImpl, InstanceHandle } from '..'
import type { ServerFlatContext } from './server'
import type { StreamClientRecv, StreamClientSend } from './types'

export type ClientFlatContext = Omit<ServerFlatContext, 'instance.register_custom_action'> & {
  'instance.register_custom_action': (
    handle: InstanceHandle,
    name: string,
    act: CustomActionImpl
  ) => Promise<void>
}

export function StreamToFlat(send: StreamClientSend): [ClientFlatContext, StreamClientRecv] {
  const callbacks: Map<string, ((msg: string, detail: string) => void)[]> = new Map()
  const custom_actions: Map<InstanceHandle, Map<string, CustomActionImpl>> = new Map()

  const recv = async (msg: string, id: string, ...args: any[]) => {
    switch (msg) {
      case 'callback':
        for (const cb of callbacks.get(id) ?? []) {
          // @ts-ignore
          cb(...args)
        }
        break
      case 'instance.custom_action.run': {
        const handle = id as InstanceHandle
        const name = args[0] as string
        const ret = await custom_actions
          .get(handle)
          ?.get(name)
          // @ts-ignore
          ?.run(...args.slice(1))
        await send('instance.custom_action', [handle, name, ret])
        break
      }
    }
  }
  return [
    new Proxy(
      {},
      {
        get(_, cmd: string) {
          switch (cmd) {
            case 'utility.register_callback':
              return (id: string, cb: (msg: string, detail: string) => void) => {
                callbacks.set(id, [...(callbacks.get(id) ?? []), cb])
                return send(cmd, [id])
              }
            case 'utility.unregister_callback':
              return (id: string) => {
                callbacks.delete(id)
                return send(cmd, [id])
              }
            case 'instance.register_custom_action':
              return (handle: InstanceHandle, name: string, act: CustomActionImpl) => {
                if (!custom_actions.has(handle)) {
                  custom_actions.set(handle, new Map())
                }
                custom_actions.get(handle)!.set(name, act)
                return send(cmd, [handle, name])
              }
            default:
              return (...args: any[]) => {
                return send(cmd, args)
              }
          }
        }
      }
    ) as ClientFlatContext,
    recv
  ]
}
