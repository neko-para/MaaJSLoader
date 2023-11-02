import {
  AnalyzeOutput,
  type Context,
  CustomActionBase,
  CustomRecognizerBase,
  ImageHandle,
  type InstanceHandle,
  type SyncCtxHandle
} from '../base'
import type { Rect } from '../base/utils'
import type { StreamServerRecv, StreamServerSend } from './types'

export type ServerFlatContext = Exclude<Awaited<ReturnType<typeof setupFlatContext>>, null>

class CustomRecognizerServer extends CustomRecognizerBase {
  handle: InstanceHandle
  name: string
  send: StreamServerSend

  resolve?: (ret: [boolean, AnalyzeOutput]) => void

  constructor(h: InstanceHandle, n: string, s: StreamServerSend) {
    super()
    this.handle = h
    this.name = n
    this.send = s
  }

  analyze(
    ctx: SyncCtxHandle,
    image: ImageHandle,
    task: string,
    param: string,
    out: AnalyzeOutput
  ): boolean | Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.resolve = ([r, o]) => {
        Object.assign(out, o)
        resolve(r)
      }
      this.send(
        'instance.custom_recognizer.analyze',
        this.handle,
        this.name,
        ctx,
        image,
        task,
        param
      )
    })
  }
}

class CustomActionServer extends CustomActionBase {
  handle: InstanceHandle
  name: string
  send: StreamServerSend

  resolve?: (ret: boolean) => void

  constructor(h: InstanceHandle, n: string, s: StreamServerSend) {
    super()
    this.handle = h
    this.name = n
    this.send = s
  }

  run(
    ctx: SyncCtxHandle,
    task: string,
    param: string,
    box: Rect,
    detail: string
  ): boolean | Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.resolve = resolve
      this.send('instance.custom_action.run', this.handle, this.name, ctx, task, param, box, detail)
    })
  }
}

export function FlatToStream(ctx: ServerFlatContext, send: StreamServerSend): StreamServerRecv {
  const callbacks: Set<string> = new Set()
  const custom_recos: Map<InstanceHandle, Map<string, CustomRecognizerServer>> = new Map()
  const custom_actions: Map<InstanceHandle, Map<string, CustomActionServer>> = new Map()

  return async (cmd: string, args: any[]): Promise<any> => {
    switch (cmd) {
      case 'utility.register_callback': {
        const id: string = args[0]
        if (callbacks.has(id)) {
          return
        } else {
          callbacks.add(id)
          await ctx['utility.register_callback'](id, (msg, detail) => {
            send('callback', id, msg, detail)
          })
        }
        break
      }
      case 'utility.unregister_callback':
        callbacks.delete(args[0])
        // @ts-ignore
        return await ctx[cmd](...args)
      case 'instance.destroy': {
        const handle = args[0] as InstanceHandle
        custom_recos.delete(handle)
        custom_actions.delete(handle)
        // @ts-ignore
        return await ctx[cmd](...args)
      }
      case 'instance.register_custom_recognizer': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        const svr = new CustomRecognizerServer(handle, name, send)
        if (!custom_recos.has(handle)) {
          custom_recos.set(handle, new Map())
        }
        custom_recos.get(handle)!.set(name, svr)
        await ctx['instance.register_custom_recognizer'](handle, name, svr.process.bind(svr))
        return
      }
      case 'instance.unregister_custom_recognizer': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        custom_recos.get(handle)?.delete(name)
        // @ts-ignore
        return await ctx[cmd](...args)
      }
      case 'instance.clear_custom_recognizer': {
        const handle = args[0] as InstanceHandle
        custom_recos.delete(handle)
        // @ts-ignore
        return await ctx[cmd](...args)
      }
      case 'instance.register_custom_action': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        const svr = new CustomActionServer(handle, name, send)
        if (!custom_actions.has(handle)) {
          custom_actions.set(handle, new Map())
        }
        custom_actions.get(handle)!.set(name, svr)
        await ctx['instance.register_custom_action'](handle, name, svr.process.bind(svr))
        return
      }
      case 'instance.unregister_custom_action': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        custom_actions.get(handle)?.delete(name)
        // @ts-ignore
        return await ctx[cmd](...args)
      }
      case 'instance.clear_custom_action': {
        const handle = args[0] as InstanceHandle
        custom_actions.delete(handle)
        // @ts-ignore
        return await ctx[cmd](...args)
      }
      case 'instance.custom_recognizer': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        custom_recos
          .get(handle)
          ?.get(name)
          ?.resolve?.([args[2] as boolean, args[3] as AnalyzeOutput])
        return
      }
      case 'instance.custom_action': {
        const handle = args[0] as InstanceHandle
        const name = args[1] as string
        custom_actions
          .get(handle)
          ?.get(name)
          ?.resolve?.(args[2] as boolean)
        return
      }

      default:
        // @ts-ignore
        return await ctx[cmd](...args)
    }
  }
}

export function setupFlatContext(ctx: Context) {
  return {
    'utility.version': ctx.utility.version.bind(ctx.utility),
    'utility.set_log_dir': ctx.utility.set_log_dir.bind(ctx.utility),
    'utility.set_save_draw': ctx.utility.set_save_draw.bind(ctx.utility),
    'utility.set_recording': ctx.utility.set_recording.bind(ctx.utility),
    'utility.set_stdout_level': ctx.utility.set_stdout_level.bind(ctx.utility),
    'utility.set_show_draw': ctx.utility.set_show_draw.bind(ctx.utility),
    'utility.acquire_id': ctx.utility.acquire_id.bind(ctx.utility),
    'utility.register_callback': ctx.utility.register_callback.bind(ctx.utility),
    'utility.unregister_callback': ctx.utility.unregister_callback.bind(ctx.utility),

    'image.create': ctx.image.create.bind(ctx.image),
    'image.destroy': ctx.image.destroy.bind(ctx.image),
    'image.is_empty': ctx.image.is_empty.bind(ctx.image),
    'image.clear': ctx.image.clear.bind(ctx.image),
    'image.info': ctx.image.info.bind(ctx.image),
    'image.encoded': ctx.image.encoded.bind(ctx.image),
    'image.setEncoded': ctx.image.setEncoded.bind(ctx.image),

    'resource.create': ctx.resource.create.bind(ctx.resource),
    'resource.destroy': ctx.resource.destroy.bind(ctx.resource),
    'resource.post_path': ctx.resource.post_path.bind(ctx.resource),
    'resource.status': ctx.resource.status.bind(ctx.resource),
    'resource.wait': ctx.resource.wait.bind(ctx.resource),
    'resource.loaded': ctx.resource.loaded.bind(ctx.resource),
    'resource.hash': ctx.resource.hash.bind(ctx.resource),

    // custom controller
    'controller.create_adb': ctx.controller.create_adb.bind(ctx.controller),
    'controller.destroy': ctx.controller.destroy.bind(ctx.controller),
    'controller.set_long_side': ctx.controller.set_long_side.bind(ctx.controller),
    'controller.set_short_side': ctx.controller.set_short_side.bind(ctx.controller),
    'controller.set_package_entry': ctx.controller.set_package_entry.bind(ctx.controller),
    'controller.set_package': ctx.controller.set_package.bind(ctx.controller),
    'controller.post_connection': ctx.controller.post_connection.bind(ctx.controller),
    'controller.post_click': ctx.controller.post_click.bind(ctx.controller),
    'controller.post_swipe': ctx.controller.post_swipe.bind(ctx.controller),
    'controller.post_key': ctx.controller.post_key.bind(ctx.controller),
    'controller.post_touch_down': ctx.controller.post_touch_down.bind(ctx.controller),
    'controller.post_touch_move': ctx.controller.post_touch_move.bind(ctx.controller),
    'controller.post_touch_up': ctx.controller.post_touch_up.bind(ctx.controller),
    'controller.post_screencap': ctx.controller.post_screencap.bind(ctx.controller),
    'controller.status': ctx.controller.status.bind(ctx.controller),
    'controller.wait': ctx.controller.wait.bind(ctx.controller),
    'controller.connected': ctx.controller.connected.bind(ctx.controller),
    'controller.image': ctx.controller.image.bind(ctx.controller),
    'controller.uuid': ctx.controller.uuid.bind(ctx.controller),

    // custom recognizer & action
    'instance.create': ctx.instance.create.bind(ctx.instance),
    'instance.destroy': ctx.instance.destroy.bind(ctx.instance),
    'instance.register_custom_recognizer': ctx.instance.register_custom_recognizer.bind(
      ctx.instance
    ),
    'instance.unregister_custom_recognizer': ctx.instance.unregister_custom_recognizer.bind(
      ctx.instance
    ),
    'instance.clear_custom_recognizer': ctx.instance.clear_custom_recognizer.bind(ctx.instance),
    'instance.register_custom_action': ctx.instance.register_custom_action.bind(ctx.instance),
    'instance.unregister_custom_action': ctx.instance.unregister_custom_action.bind(ctx.instance),
    'instance.clear_custom_action': ctx.instance.clear_custom_action.bind(ctx.instance),
    'instance.bind_resource': ctx.instance.bind_resource.bind(ctx.instance),
    'instance.bind_controller': ctx.instance.bind_controller.bind(ctx.instance),
    'instance.inited': ctx.instance.inited.bind(ctx.instance),
    'instance.post_task': ctx.instance.post_task.bind(ctx.instance),
    'instance.set_task_param': ctx.instance.set_task_param.bind(ctx.instance),
    'instance.status': ctx.instance.status.bind(ctx.instance),
    'instance.wait': ctx.instance.wait.bind(ctx.instance),
    'instance.all_finished': ctx.instance.all_finished.bind(ctx.instance),
    'instance.stop': ctx.instance.stop.bind(ctx.instance),
    'instance.resource': ctx.instance.resource.bind(ctx.instance),
    'instance.controller': ctx.instance.controller.bind(ctx.instance),

    'syncctx.run_task': ctx.syncctx.run_task.bind(ctx.syncctx),
    'syncctx.run_recognizer': ctx.syncctx.run_recognizer.bind(ctx.syncctx),
    'syncctx.run_action': ctx.syncctx.run_action.bind(ctx.syncctx),
    'syncctx.click': ctx.syncctx.click.bind(ctx.syncctx),
    'syncctx.swipe': ctx.syncctx.swipe.bind(ctx.syncctx),
    'syncctx.key': ctx.syncctx.key.bind(ctx.syncctx),
    'syncctx.touch_down': ctx.syncctx.touch_down.bind(ctx.syncctx),
    'syncctx.touch_move': ctx.syncctx.touch_move.bind(ctx.syncctx),
    'syncctx.touch_up': ctx.syncctx.touch_up.bind(ctx.syncctx),
    'syncctx.screencap': ctx.syncctx.screencap.bind(ctx.syncctx),
    'syncctx.task_result': ctx.syncctx.task_result.bind(ctx.syncctx),

    'device.find': ctx.device.find.bind(ctx.device),
    'device.find_with_adb': ctx.device.find_with_adb.bind(ctx.device)

    // config
  }
}
