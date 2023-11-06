import { context } from './context'
import type { ImageHandle, Rect, SyncCtxHandle } from './types'
import { toPbRect } from './utility'

export class SyncCtx {
  handle!: SyncCtxHandle

  static async init_from(from: SyncCtxHandle) {
    const res = new SyncCtx()
    res.handle = from
    return res
  }

  async run_task(task: string, param: string | Record<string, unknown>) {
    if (typeof param === 'object') {
      param = JSON.stringify(param)
    }
    await context['synccontext.run_task']({ handle: this.handle, task, param })
  }

  async run_recognizer(task: string, param: string | Record<string, unknown>, image: ImageHandle) {
    if (typeof param === 'object') {
      param = JSON.stringify(param)
    }
    return await context['synccontext.run_recognizer']({
      handle: this.handle,
      task,
      param,
      image_handle: image
    })
  }

  async run_action(
    task: string,
    param: string | Record<string, unknown>,
    box: Rect,
    detail?: string
  ) {
    if (typeof param === 'object') {
      param = JSON.stringify(param)
    }
    await context['synccontext.run_action']({
      handle: this.handle,
      task,
      param,
      box: toPbRect(box),
      detail
    })
  }

  async click(x: number, y: number) {
    await context['synccontext.click']({
      handle: this.handle,
      param: {
        point: { x, y }
      }
    })
  }

  async swipe(x1: number, y1: number, x2: number, y2: number, duration: number) {
    await context['synccontext.swipe']({
      handle: this.handle,
      param: {
        from: {
          x: x1,
          y: y1
        },
        to: {
          x: x2,
          y: y2
        },
        duration
      }
    })
  }

  async key(key: number) {
    await context['synccontext.key']({
      handle: this.handle,
      param: {
        key
      }
    })
  }

  async touch_down(contact: number, x: number, y: number, pressure: number) {
    await context['synccontext.touch_down']({
      handle: this.handle,
      param: {
        contact,
        pos: { x, y },
        pressure
      }
    })
  }

  async touch_move(contact: number, x: number, y: number, pressure: number) {
    await context['synccontext.touch_move']({
      handle: this.handle,
      param: {
        contact,
        pos: { x, y },
        pressure
      }
    })
  }

  async touch_up(contact: number) {
    await context['synccontext.touch_up']({
      handle: this.handle,
      param: {
        contact
      }
    })
  }

  async screencap(image: ImageHandle) {
    await context['synccontext.screencap']({
      handle: this.handle,
      image_handle: image
    })
  }

  async task_result(task: string) {
    return (await context['synccontext.task_result']({
      handle: this.handle,
      str: task
    }))!.str!
  }
}
