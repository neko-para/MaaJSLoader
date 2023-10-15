import * as maarpc from '../gen'
import { ImageHandle } from './buffer'

export type ControllerHandle = string & { __brand: 'ControllerHandle' }
export type ControllerActionId = number & { __brand: 'ControllerActionId' }

export class ControllerClient {
  _client: maarpc.ControllerClient

  constructor(c: maarpc.ControllerClient) {
    this._client = c
  }

  async create_adb(
    id: string,
    adb_path: string,
    adb_serial: string,
    adb_type: number,
    adb_config: string
  ) {
    return (
      await this._client.create_adb(
        new maarpc.AdbControllerRequest({ id, adb_path, adb_serial, adb_type, adb_config })
      )
    ).handle as ControllerHandle
  }

  async create_custom(
    id: string,
    ctrl: (
      req: maarpc.CustomControllerResponse,
      res: maarpc.CustomControllerRequest
    ) => boolean | Promise<boolean>
  ) {
    const stream = this._client.create_custom()
    await new Promise(resolve =>
      stream.write(new maarpc.CustomControllerRequest({ init: id }), resolve)
    )

    const handle = await new Promise<ControllerHandle>(resolve => {
      stream.once('readable', () => {
        resolve(stream.read().init as ControllerHandle)
      })
    })

    stream.on('readable', async () => {
      const res = stream.read()
      if (!res) {
        return
      }
      const req = new maarpc.CustomControllerRequest()
      req.ok = await ctrl(res, req)
      stream.write(req)
    })

    return handle
  }

  async destroy(handle: ControllerHandle) {
    await this._client.destroy(new maarpc.HandleRequest({ handle }))
  }

  async post_connection(handle: ControllerHandle) {
    return (await this._client.post_connection(new maarpc.HandleRequest({ handle })))
      .id as ControllerActionId
  }

  async post_click(handle: ControllerHandle, x: number, y: number) {
    return (
      await this._client.post_click(
        maarpc.ControllerPostClickRequest.fromObject({
          handle,
          param: {
            point: {
              x,
              y
            }
          }
        })
      )
    ).id as ControllerActionId
  }

  async post_swipe(
    handle: ControllerHandle,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    duration: number
  ) {
    return (
      await this._client.post_swipe(
        maarpc.ControllerPostSwipeRequest.fromObject({
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
    ).id as ControllerActionId
  }

  async post_key(handle: ControllerHandle, key: number) {
    return (
      await this._client.post_key(
        maarpc.ControllerPostKeyRequest.fromObject({
          handle,
          param: {
            key
          }
        })
      )
    ).id as ControllerActionId
  }

  async post_touch_down(
    handle: ControllerHandle,
    contact: number,
    x: number,
    y: number,
    pressure: number
  ) {
    return (
      await this._client.post_touch_down(
        maarpc.ControllerPostTouchRequest.fromObject({
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
    ).id as ControllerActionId
  }

  async post_touch_move(
    handle: ControllerHandle,
    contact: number,
    x: number,
    y: number,
    pressure: number
  ) {
    return (
      await this._client.post_touch_move(
        maarpc.ControllerPostTouchRequest.fromObject({
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
    ).id as ControllerActionId
  }

  async post_touch_up(handle: ControllerHandle, contact: number) {
    return (
      await this._client.post_touch_up(
        maarpc.ControllerPostTouchRequest.fromObject({
          handle,
          param: {
            contact
          }
        })
      )
    ).id as ControllerActionId
  }

  async post_screencap(handle: ControllerHandle) {
    return (await this._client.post_screencap(new maarpc.HandleRequest({ handle })))
      .id as ControllerActionId
  }

  async status(handle: ControllerHandle, id: ControllerActionId) {
    return (await this._client.status(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async wait(handle: ControllerHandle, id: ControllerActionId) {
    return (await this._client.wait(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async connected(handle: ControllerHandle) {
    return (await this._client.connected(new maarpc.HandleRequest({ handle }))).bool
  }

  async image(handle: ControllerHandle, image: ImageHandle) {
    await this._client.image(new maarpc.HandleHandleRequest({ handle, another_handle: image }))
  }

  async uuid(handle: ControllerHandle) {
    return (await this._client.uuid(new maarpc.HandleRequest({ handle }))).str
  }
}
