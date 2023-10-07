import { context } from '.'
import { AdbConfig } from './adb'
import { ControllerActionId, ControllerHandle } from './base'
import { Image } from './buffer'
import { Callback } from './types'

export interface AdbControllerConfig {
  path?: string
  serial?: string
  type?: number
  config?: string
}

const defAdbCfg: Required<AdbControllerConfig> = {
  path: 'adb' + (process.platform === 'win32' ? '.exe' : ''),
  serial: '127.0.0.1:5555',
  type: 1 + (1 << 8) + (4 << 16), // Preset Adb + Encoded
  config: AdbConfig
}

export class Controller {
  cbId!: string
  handle!: ControllerHandle

  static initAdb(cb: Callback, cfg?: AdbControllerConfig) {
    return new Controller().createAdb(cb, cfg)
  }

  async createAdb(cb: Callback, cfg?: AdbControllerConfig) {
    const c = {
      ...defAdbCfg,
      ...(cfg ?? {})
    }
    this.cbId = await context.utility.acquire_id()
    context.utility.register_callback(this.cbId, cb)
    this.handle = await context.controller.createAdb(this.cbId, c.path, c.serial, c.type, c.config)
    return this
  }

  async destroy() {
    await context.controller.destroy(this.handle)
    await context.utility.unregister_callback(this.cbId)
  }

  private wrap(id: Promise<ControllerActionId>) {
    return {
      controller: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context.controller.status(this.controller.handle, i)
        })()
      },
      async wait() {
        await context.controller.wait(this.controller.handle, await id)
      }
    }
  }

  post_connection() {
    return this.wrap(context.controller.post_connection(this.handle))
  }

  post_click(x: number, y: number) {
    return this.wrap(context.controller.post_click(this.handle, x, y))
  }

  post_swipe(x1: number, y1: number, x2: number, y2: number, duration: number) {
    return this.wrap(context.controller.post_swipe(this.handle, x1, y1, x2, y2, duration))
  }

  post_key(key: number) {
    return this.wrap(context.controller.post_key(this.handle, key))
  }

  post_touch_down(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(context.controller.post_touch_down(this.handle, contact, x, y, pressure))
  }

  post_touch_move(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(context.controller.post_touch_move(this.handle, contact, x, y, pressure))
  }

  post_touch_up(contact: number) {
    return this.wrap(context.controller.post_touch_up(this.handle, contact))
  }

  post_screencap() {
    return this.wrap(context.controller.post_screencap(this.handle))
  }

  get connected() {
    return context.controller.connected(this.handle)
  }

  async image(img: Image) {
    await context.controller.image(this.handle, img.handle)
  }

  get uuid() {
    return context.controller.uuid(this.handle)
  }
}
