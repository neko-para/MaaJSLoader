import * as maarpc from '../gen'
import { ImageHandle } from './buffer'

export type ControllerHandle = string & { __brand: 'ControllerHandle' }
export type ControllerActionId = number & { __brand: 'ControllerActionId' }

export type ResolutionOutput = {
  resolution: [width: number, height: number]
}

export type UuidOutput = {
  uuid: string
}

export class CustomControllerBase {
  process(req: maarpc.CustomControllerResponse, res: maarpc.CustomControllerRequest) {
    switch (req.command) {
      case 'connect':
        return this.connect()
      case 'click':
        return this.click(req.click.point.x, req.click.point.y)
      case 'swipe':
        return this.swipe(
          req.swipe.from.x,
          req.swipe.from.y,
          req.swipe.to.x,
          req.swipe.to.y,
          req.swipe.duration
        )
      case 'key':
        return this.key(req.key.key)
      case 'touch_down':
        return this.touch_down(
          req.touch_down.contact,
          req.touch_down.pos.x,
          req.touch_down.pos.y,
          req.touch_down.pressure
        )
      case 'touch_move':
        return this.touch_move(
          req.touch_down.contact,
          req.touch_down.pos.x,
          req.touch_down.pos.y,
          req.touch_down.pressure
        )
      case 'touch_up':
        return this.touch_up(req.touch_down.contact)
      case 'start':
        return this.start(req.start)
      case 'stop':
        return this.start(req.stop)
      case 'resolution': {
        const out: ResolutionOutput = {
          resolution: [0, 0]
        }
        const ret = this.resolution(out)
        if (typeof ret === 'boolean') {
          res.resolution = new maarpc.Size({ width: out.resolution[0], height: out.resolution[1] })
          return ret
        } else {
          return ret.then(v => {
            res.resolution = new maarpc.Size({
              width: out.resolution[0],
              height: out.resolution[1]
            })
            return v
          })
        }
      }
      case 'image':
        return this.image(req.image as ImageHandle)
      case 'uuid': {
        const out: UuidOutput = {
          uuid: ''
        }
        const ret = this.uuid(out)
        if (typeof ret === 'boolean') {
          res.uuid = out.uuid
          return ret
        } else {
          return ret.then(v => {
            res.uuid = out.uuid
            return v
          })
        }
      }
      case 'set_option':
        return this.set_option(req.set_option.key, req.set_option.value)
      default:
        return false
    }
  }

  connect(): boolean | Promise<boolean> {
    return false
  }

  click(x: number, y: number): boolean | Promise<boolean> {
    return false
  }

  swipe(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    duration: number
  ): boolean | Promise<boolean> {
    return false
  }

  key(key: number): boolean | Promise<boolean> {
    return false
  }

  touch_down(contact: number, x: number, y: number, pressure: number): boolean | Promise<boolean> {
    return false
  }

  touch_move(contact: number, x: number, y: number, pressure: number): boolean | Promise<boolean> {
    return false
  }

  touch_up(contact: number): boolean | Promise<boolean> {
    return false
  }

  start(pkg: string): boolean | Promise<boolean> {
    return false
  }

  stop(pkg: string): boolean | Promise<boolean> {
    return false
  }

  resolution(out: ResolutionOutput): boolean | Promise<boolean> {
    return false
  }

  image(img: ImageHandle): boolean | Promise<boolean> {
    return false
  }

  uuid(u: UuidOutput): boolean | Promise<boolean> {
    return false
  }

  set_option(key: number, value: string): boolean | Promise<boolean> {
    return false
  }
}

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

  async set_long_side(handle: ControllerHandle, len: number) {
    // https://github.com/thesayyn/protoc-gen-ts/issues/235
    await this._client.set_option(
      maarpc.ControllerSetOptionRequest.fromObject({
        handle,
        long_side: len
      })
    )
  }

  async set_short_side(handle: ControllerHandle, len: number) {
    await this._client.set_option(
      maarpc.ControllerSetOptionRequest.fromObject({
        handle,
        short_side: len
      })
    )
  }

  async set_package_entry(handle: ControllerHandle, entry: string) {
    await this._client.set_option(
      maarpc.ControllerSetOptionRequest.fromObject({
        handle,
        def_package_entry: entry
      })
    )
  }

  async set_package(handle: ControllerHandle, pkg: string) {
    await this._client.set_option(
      maarpc.ControllerSetOptionRequest.fromObject({
        handle,
        def_package: pkg
      })
    )
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
