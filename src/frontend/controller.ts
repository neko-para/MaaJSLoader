import * as maarpc from '../gen/types'
import { PbToObject } from '../helper'
import { AdbConfig } from './adb'
import { context, contextInput, contextOutput } from './context'
import { Image } from './image'
import {
  AdbControllerType,
  ControllerActionId,
  type ControllerHandle,
  type ImageHandle
} from './types'
import {
  acquire_id,
  register_callback,
  register_callback_for,
  unregister_callback,
  update_callback,
  update_callback_for
} from './utility'

export interface AdbControllerConfig {
  path?: string
  serial?: string
  type?: number
  config?: string
}

const defAdbCfg: Required<AdbControllerConfig> = {
  path: 'adb',
  serial: '127.0.0.1:5555',
  type: AdbControllerType.Input_Preset_Adb + AdbControllerType.Screencap_Encode,
  config: AdbConfig
}

export type ResolutionOutput = {
  resolution: [width: number, height: number]
}

export type UuidOutput = {
  uuid: string
}

export class CustomControllerBase {
  async process(
    req: PbToObject<maarpc.CustomControllerResponse>,
    res: PbToObject<maarpc.CustomControllerRequest>
  ) {
    switch (true) {
      case 'connect' in req:
        return this.connect()
      case 'click' in req:
        return this.click(req.click!.point!.x!, req.click!.point!.y!)
      case 'swipe' in req:
        return this.swipe(
          req.swipe!.from!.x!,
          req.swipe!.from!.y!,
          req.swipe!.to!.x!,
          req.swipe!.to!.y!,
          req.swipe!.duration!
        )
      case 'key' in req:
        return this.key(req.key!.key!)
      case 'touch_down' in req:
        return this.touch_down(
          req.touch_down!.contact!,
          req.touch_down!.pos!.x!,
          req.touch_down!.pos!.y!,
          req.touch_down!.pressure!
        )
      case 'touch_move' in req:
        return this.touch_move(
          req.touch_down!.contact!,
          req.touch_down!.pos!.x!,
          req.touch_down!.pos!.y!,
          req.touch_down!.pressure!
        )
      case 'touch_up' in req:
        return this.touch_up(req.touch_down!.contact!)
      case 'start' in req:
        return this.start(req.start!)
      case 'stop' in req:
        return this.start(req.stop!)
      case 'resolution' in req: {
        const out: ResolutionOutput = {
          resolution: [0, 0]
        }
        const ret = await this.resolution(out)
        res.resolution = { width: out.resolution[0], height: out.resolution[1] }
        return ret
      }
      case 'image' in req:
        return this.image(Image.init_from(req.image! as ImageHandle))
      case 'uuid' in req: {
        const out: UuidOutput = {
          uuid: ''
        }
        const ret = await this.uuid(out)
        res.uuid = out.uuid
        return ret
      }
      case 'set_option' in req:
        return this.set_option(req.set_option!.key!, req.set_option!.value!)
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

export class Controller {
  rpcId!: string
  rpcCtrlId?: string
  cbId!: string
  handle!: ControllerHandle
  onCallback: (msg: string, detail: string) => Promise<void> = async () => {}

  static async init_from(from: ControllerHandle, id: string, rid: string) {
    const ctrl = new Controller()
    ctrl.rpcId = rid
    ctrl.cbId = id
    ctrl.handle = from
    update_callback_for(rid, ctrl)
    return ctrl
  }

  static async init_from_custom(
    from: ControllerHandle,
    id: string,
    rid: string,
    rcid: string,
    base: CustomControllerBase
  ) {
    const ctrl = new Controller()
    ctrl.rpcId = rid
    ctrl.cbId = id
    ctrl.handle = from
    update_callback_for(rid, ctrl)
    contextOutput[rcid] = async (res: PbToObject<maarpc.CustomControllerResponse>) => {
      if (res) {
        const req: PbToObject<maarpc.CustomControllerRequest> = {}
        req.ok = await base.process(res, req)
        contextInput[rcid]?.(req)
      }
    }
    return ctrl
  }

  static init_adb(cfg?: AdbControllerConfig) {
    return new Controller().create_adb(cfg)
  }

  static init_custom(ctrl: CustomControllerBase) {
    return new Controller().create_custom(ctrl)
  }

  async create_adb(cfg?: AdbControllerConfig) {
    const c = {
      ...defAdbCfg,
      ...(cfg ?? {})
    }
    this.cbId = await acquire_id()
    this.rpcId = await register_callback_for(this.cbId, this)
    this.handle = (await context['controller.create_adb']({
      id: this.cbId,
      adb_path: c.path,
      adb_serial: c.serial,
      adb_type: c.type,
      adb_config: c.config
    }))!.handle! as ControllerHandle
    return this
  }

  async create_custom(ctrl: CustomControllerBase) {
    this.cbId = await acquire_id()
    this.rpcId = await register_callback_for(this.cbId, this)
    let initRes: ((h: ControllerHandle) => void) | null = null
    this.rpcCtrlId = await context['controller.create_custom'](async res => {
      if (res) {
        if (initRes && res.init) {
          initRes(res.init as ControllerHandle)
          initRes = null
        } else {
          const req: PbToObject<maarpc.CustomControllerRequest> = {}
          req.ok = await ctrl.process(res, req)
          contextInput[this.rpcCtrlId!]?.(req)
        }
      }
    })
    this.handle = await new Promise<ControllerHandle>(res => {
      initRes = res
    })
    return this
  }

  async destroy() {
    await context['controller.destroy']({ handle: this.handle })
    await unregister_callback(this.cbId)
  }

  async set_long_side(l: number) {
    await context['controller.set_option']({ handle: this.handle, long_side: l })
  }

  async set_short_side(s: number) {
    await context['controller.set_option']({ handle: this.handle, short_side: s })
  }

  async set_package_entry(e: string) {
    await context['controller.set_option']({ handle: this.handle, def_package_entry: e })
  }

  async set_package(e: string) {
    await context['controller.set_option']({ handle: this.handle, def_package: e })
  }

  private wrap(_id: Promise<{ id?: number } | null>) {
    const id = _id as Promise<{
      id: ControllerActionId
    }>
    return {
      controller: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return (await context['controller.status']({ handle: this.controller.handle, id: i.id }))!
            .status!
        })()
      },
      async wait() {
        return (await context['controller.wait']({
          handle: this.controller.handle,
          id: (await id).id
        }))!.status!
      }
    }
  }

  post_connection() {
    return this.wrap(context['controller.post_connection']({ handle: this.handle }))
  }

  post_click(x: number, y: number) {
    return this.wrap(
      context['controller.post_click']({
        handle: this.handle,
        param: {
          point: {
            x,
            y
          }
        }
      })
    )
  }

  post_swipe(x1: number, y1: number, x2: number, y2: number, duration: number) {
    return this.wrap(
      context['controller.post_swipe']({
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
    )
  }

  post_key(key: number) {
    return this.wrap(
      context['controller.post_press_key']({
        handle: this.handle,
        param: {
          key
        }
      })
    )
  }

  post_touch_down(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(
      context['controller.post_touch_down']({
        handle: this.handle,
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

  post_touch_move(contact: number, x: number, y: number, pressure: number) {
    return this.wrap(
      context['controller.post_touch_move']({
        handle: this.handle,
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

  post_touch_up(contact: number) {
    return this.wrap(
      context['controller.post_touch_up']({
        handle: this.handle,
        param: {
          contact
        }
      })
    )
  }

  post_screencap() {
    return this.wrap(context['controller.post_screencap']({ handle: this.handle }))
  }

  get connected() {
    return (async () => (await context['controller.connected']({ handle: this.handle }))!.bool!)()
  }

  async image(img: Image) {
    await context['controller.image']({ handle: this.handle, another_handle: img.handle })
  }

  get uuid() {
    return context['controller.uuid']({ handle: this.handle })
  }
}
