import type { CustomActionImpl, CustomRecognizerImpl, InstanceHandle } from '..'
import type { ServerFlatContext } from './server'
import type { StreamClientRecv, StreamClientSend } from './types'

export type ClientFlatContext = Omit<
  ServerFlatContext,
  'instance.register_custom_recognizer' | 'instance.register_custom_action'
> & {
  'instance.register_custom_recognizer': (
    handle: InstanceHandle,
    name: string,
    reco: CustomRecognizerImpl
  ) => Promise<void>
  'instance.register_custom_action': (
    handle: InstanceHandle,
    name: string,
    act: CustomActionImpl
  ) => Promise<void>
}

export function StreamToFlat(send: StreamClientSend): [ClientFlatContext, StreamClientRecv] {
  const callbacks: Map<string, ((msg: string, detail: string) => void)[]> = new Map()
  const custom_recos: Map<InstanceHandle, Map<string, CustomRecognizerImpl>> = new Map()
  const custom_actions: Map<InstanceHandle, Map<string, CustomActionImpl>> = new Map()

  const recv = async (msg: string, id: string, ...args: any[]) => {
    switch (msg) {
      case 'callback':
        for (const cb of callbacks.get(id) ?? []) {
          // @ts-ignore
          cb(...args)
        }
        break
      case 'instance.custom_recognizer.analyze': {
        const handle = id as InstanceHandle
        const name = args[0] as string
        const ret = await custom_recos
          .get(handle)
          ?.get(name)
          // @ts-ignore
          ?.analyze(...args.slice(1))
        await send('instance.custom_recognizer', [handle, name, ret, args[5]]) // args5 is out
        break
      }
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
            case 'instance.destroy':
              return (handle: InstanceHandle) => {
                custom_recos.delete(handle)
                custom_actions.delete(handle)
                return send(cmd, [handle])
              }
            case 'instance.register_custom_recognizer':
              return (handle: InstanceHandle, name: string, reco: CustomRecognizerImpl) => {
                if (!custom_recos.has(handle)) {
                  custom_recos.set(handle, new Map())
                }
                custom_recos.get(handle)!.set(name, reco)
                return send(cmd, [handle, name])
              }
            case 'instance.unregister_custom_recognizer':
              return (handle: InstanceHandle, name: string) => {
                custom_recos.get(handle)?.delete(name)
                return send(cmd, [handle, name])
              }
            case 'instance.clear_custom_recognizer':
              return (handle: InstanceHandle) => {
                custom_recos.delete(handle)
                return send(cmd, [handle])
              }
            case 'instance.register_custom_action':
              return (handle: InstanceHandle, name: string, act: CustomActionImpl) => {
                if (!custom_actions.has(handle)) {
                  custom_actions.set(handle, new Map())
                }
                custom_actions.get(handle)!.set(name, act)
                return send(cmd, [handle, name])
              }
            case 'instance.unregister_custom_action':
              return (handle: InstanceHandle, name: string) => {
                custom_actions.get(handle)?.delete(name)
                return send(cmd, [handle, name])
              }
            case 'instance.clear_custom_action':
              return (handle: InstanceHandle) => {
                custom_actions.delete(handle)
                return send(cmd, [handle])
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
