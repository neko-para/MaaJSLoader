import { Image, Instance, context } from '.'
import { SyncCtxClient, SyncCtxHandle } from '../base'

type RemoveHandle<T extends unknown[]> = T extends [SyncCtxHandle, ...infer Rest] ? Rest : T
type MakeParam<K extends keyof InstanceType<typeof SyncCtxClient>> = InstanceType<
  typeof SyncCtxClient
>[K] extends (...args: any[]) => any
  ? RemoveHandle<Parameters<InstanceType<typeof SyncCtxClient>[K]>>
  : never

export class SyncCtx {
  handle!: SyncCtxHandle

  static init_from(from: SyncCtxHandle) {
    const sc = new SyncCtx()
    sc.handle = from
    return sc
  }

  async run_task(...args: MakeParam<'run_task'>) {
    await context.syncctx.run_task(this.handle, ...args)
  }

  async run_recognizer(...args: MakeParam<'run_recognizer'>) {
    return await context.syncctx.run_recognizer(this.handle, ...args)
  }

  async run_action(...args: MakeParam<'run_action'>) {
    await context.syncctx.run_action(this.handle, ...args)
  }

  async click(...args: MakeParam<'click'>) {
    await context.syncctx.click(this.handle, ...args)
  }

  async swipe(...args: MakeParam<'swipe'>) {
    await context.syncctx.swipe(this.handle, ...args)
  }

  async key(...args: MakeParam<'key'>) {
    await context.syncctx.key(this.handle, ...args)
  }

  async touch_down(...args: MakeParam<'touch_down'>) {
    await context.syncctx.touch_down(this.handle, ...args)
  }

  async touch_move(...args: MakeParam<'touch_move'>) {
    await context.syncctx.touch_move(this.handle, ...args)
  }

  async touch_up(...args: MakeParam<'touch_up'>) {
    await context.syncctx.touch_up(this.handle, ...args)
  }

  async screencap(image: Image) {
    await context.syncctx.screencap(this.handle, image.handle)
  }

  async task_result(...args: MakeParam<'task_result'>) {
    return await context.syncctx.task_result(this.handle, ...args)
  }
}
