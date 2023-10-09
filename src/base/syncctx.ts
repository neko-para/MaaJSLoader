import { ImageHandle } from '.'
import * as maarpc from '../gen'
import { toJsRect, toPbRect } from './utils'

export type SyncCtxHandle = string & { __brand: 'SyncCtxHandle' }

export class SyncCtxClient {
  _client: maarpc.SyncContextClient

  constructor(c: maarpc.SyncContextClient) {
    this._client = c
  }

  async run_task(handle: SyncCtxHandle, task: string, param: string | Record<string, unknown>) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    await this._client.run_task(new maarpc.SyncContextRunTaskRequest({ handle, task, param }))
  }

  async run_recognizer(
    handle: SyncCtxHandle,
    task: string,
    param: string | Record<string, unknown>,
    image: ImageHandle
  ) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    const resp = await this._client.run_recognizer(
      new maarpc.SyncContextRunRecognizerRequest({ handle, task, param, image_handle: image })
    )
    return {
      match: resp.match,
      box: toJsRect(resp.box),
      detail: resp.detail
    }
  }

  async run_action(
    handle: SyncCtxHandle,
    task: string,
    param: string | Record<string, unknown>,
    box: { x: number; y: number; width: number; height: number },
    detail: string
  ) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    await this._client.run_action(
      new maarpc.SyncContextRunActionRequest({
        handle,
        task,
        param,
        box: toPbRect(box),
        detail
      })
    )
  }

  async click(handle: SyncCtxHandle, x: number, y: number) {
    await this._client.click(
      maarpc.SyncContextClickRequest.fromObject({
        handle,
        param: {
          point: {
            x,
            y
          }
        }
      })
    )
  }
  async swipe(
    handle: SyncCtxHandle,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    duration: number
  ) {
    await this._client.swipe(
      maarpc.SyncContextSwipeRequest.fromObject({
        handle,
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
    )
  }

  async key(handle: SyncCtxHandle, key: number) {
    await this._client.key(
      maarpc.SyncContextKeyRequest.fromObject({
        handle,
        param: {
          key
        }
      })
    )
  }

  async touch_down(handle: SyncCtxHandle, contact: number, x: number, y: number, pressure: number) {
    await this._client.touch_down(
      maarpc.SyncContextTouchRequest.fromObject({
        handle,
        param: {
          contact,
          pos: {
            x,
            y
          },
          pressure
        }
      })
    )
  }

  async touch_move(handle: SyncCtxHandle, contact: number, x: number, y: number, pressure: number) {
    await this._client.touch_down(
      maarpc.SyncContextTouchRequest.fromObject({
        handle,
        param: {
          contact,
          pos: {
            x,
            y
          },
          pressure
        }
      })
    )
  }

  async touch_up(handle: SyncCtxHandle, contact: number) {
    await this._client.touch_down(
      maarpc.SyncContextTouchRequest.fromObject({
        handle,
        param: {
          contact
        }
      })
    )
  }

  async screencap(handle: SyncCtxHandle, image: ImageHandle) {
    await this._client.screencap(
      new maarpc.SyncContextScreencapRequest({ handle, image_handle: image })
    )
  }

  async task_result(handle: SyncCtxHandle, task: string) {
    return (await this._client.task_result(new maarpc.HandleStringRequest({ handle, str: task })))
      .str
  }
}
