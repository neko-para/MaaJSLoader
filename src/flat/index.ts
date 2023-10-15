import { Context } from '../base'

export type FlatContext = Exclude<Awaited<ReturnType<typeof setupFlatContext>>, null>

export function FlatToStream(ctx: FlatContext) {
  return async (cmd: string, args: any[]): Promise<any> => {
    // @ts-ignore
    return await ctx[cmd](...args)
  }
}

export function StreamToFlat(to: (cmd: string, args: any[]) => Promise<any>): FlatContext {
  return new Proxy(
    {},
    {
      get(_, cmd: string) {
        return (...args: any[]) => {
          return to(cmd, args)
        }
      }
    }
  ) as FlatContext
}

export function setupFlatContext(ctx: Context) {
  return {
    'utility.version': ctx.utility.version.bind(ctx.utility),
    'utility.set_logging': ctx.utility.set_logging.bind(ctx.utility),
    'utility.set_debug_mode': ctx.utility.set_debug_mode.bind(ctx.utility),
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

    'device.find': ctx.device.find.bind(ctx.device),
    'device.find_with_adb': ctx.device.find_with_adb.bind(ctx.device)

    // config
  }
}
