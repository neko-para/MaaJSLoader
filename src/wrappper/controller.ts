import { context } from '.'
import { ControllerActionId, ControllerHandle, ImageHandle } from '../base'
import * as maarpc from '../gen'
import { AdbConfig } from './adb'
import { Image } from './buffer'
import { Callback } from './types'

export interface AdbControllerConfig {
  path?: string
  serial?: string
  type?: number
  config?: string
}

export type ResolutionOutput = {
  resolution: [width: number, height: number]
}

export type UuidOutput = {
  uuid: string
}

const defAdbCfg: Required<AdbControllerConfig> = {
  path: 'adb',
  serial: '127.0.0.1:5555',
  type: 1 + (1 << 8) + (4 << 16), // Preset Adb + Encoded
  config: AdbConfig
}
/*
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
        return this.image(Image.init_from(req.image as ImageHandle))
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

  image(img: Image): boolean | Promise<boolean> {
    return false
  }

  uuid(u: UuidOutput): boolean | Promise<boolean> {
    return false
  }

  set_option(key: number, value: string): boolean | Promise<boolean> {
    return false
  }
}
*/
export class Controller {
  cbId!: string
  handle!: ControllerHandle

  static init_from(from: ControllerHandle) {
    const ctrl = new Controller()
    ctrl.handle = from
    return ctrl
  }

  static initAdb(cb: Callback, cfg?: AdbControllerConfig) {
    return new Controller().createAdb(cb, cfg)
  }

  // static initCustom(cb: Callback, ctrl: CustomControllerBase) {
  //   return new Controller().createCustom(cb, ctrl)
  // }

  async createAdb(cb: Callback, cfg?: AdbControllerConfig) {
    const c = {
      ...defAdbCfg,
      ...(cfg ?? {})
    }
    this.cbId = await context['utility.acquire_id']()
    context['utility.register_callback'](this.cbId, cb)
    this.handle = await context['controller.create_adb'](
      this.cbId,
      c.path,
      c.serial,
      c.type,
      c.config
    )
    return this
  }

  // async createCustom(cb: Callback, ctrl: CustomControllerBase) {
  //   this.cbId = await context['utility.acquire_id']()
  //   context['utility.register_callback'](this.cbId, cb)
  //   this.handle = await context['controller.create_custom'](this.cbId, (req, res) => {
  //     return ctrl.process(req, res)
  //   })
  //   return this
  // }

  async destroy() {
    await context['controller.destroy'](this.handle)
    await context['utility.unregister_callback'](this.cbId)
  }

  private wrap(id: Promise<ControllerActionId>) {
    return {
      controller: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context['controller.status'](this.controller.handle, i)
        })()
      },
      async wait() {
        return await context['controller.wait'](this.controller.handle, await id)
      }
    }
  }

  post_connection() {
    return this.wrap(context['controller.post_connection'](this.handle))
  }

  post_click(x: number, y: number) {
    return this.wrap(context['controller.post_click'](this.handle, x, y))
  }

  post_swipe(x1: number, y1: number, x2: number, y2: number, duration: number) {
    return this.wrap(context['controller.post_swipe'](this.handle, x1, y1, x2, y2, duration))
  }

  post_key(key: number) {
    return this.wrap(context['controller.post_key'](this.handle, key))
  }

  post_touch_down(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(context['controller.post_touch_down'](this.handle, contact, x, y, pressure))
  }

  post_touch_move(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(context['controller.post_touch_move'](this.handle, contact, x, y, pressure))
  }

  post_touch_up(contact: number) {
    return this.wrap(context['controller.post_touch_up'](this.handle, contact))
  }

  post_screencap() {
    return this.wrap(context['controller.post_screencap'](this.handle))
  }

  get connected() {
    return context['controller.connected'](this.handle)
  }

  async image(img: Image) {
    await context['controller.image'](this.handle, img.handle)
  }

  get uuid() {
    return context['controller.uuid'](this.handle)
  }
}
