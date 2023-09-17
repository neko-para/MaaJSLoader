import koffi from 'koffi'

import { MaaImageBuffer, MaaStringBuffer } from '.'
import {
  MaaAPICallback,
  MaaControllerCallback,
  MaaControllerHandle,
  MaaCtrlOptionEnum,
  MaaFrameworkLoader,
  MaaID
} from '..'
import { MaaMsg } from '../msg'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export interface MaaCustomControllerInfo {
  // set_option?: (key: number, value: string) => boolean

  connect?: () => boolean
  click?: (x: number, y: number) => boolean
  swipe?: (x1: number, y1: number, x2: number, y2: number, duration: number) => boolean

  touch_down?: (contact: number, x: number, y: number, pressure: number) => boolean
  touch_move?: (contact: number, x: number, y: number, pressure: number) => boolean
  touch_up?: (contact: number) => boolean

  press_key?: (key: number) => boolean

  start_app?: (pkg: string) => boolean
  stop_app?: (pkg: string) => boolean

  get_resolution?: () => null | [number, number]
  get_image?: (ib: MaaImageBuffer) => boolean
  get_uuid?: () => null | string
}

export class MaaController {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: koffi.IKoffiRegisteredCallback
  handle: MaaControllerHandle
  onDestroy: () => void
  connectId?: MaaID

  static createAdbController(
    l: MaaFrameworkLoader,
    adb: string,
    address: string,
    type: number,
    config: string,
    cb?: MaaAPICallback
  ) {
    return new MaaController(
      l,
      c => {
        return l.func.MaaAdbControllerCreate(adb, address, type, config, c, 0)
      },
      cb
    )
  }

  static createCustomController(
    l: MaaFrameworkLoader,
    ctrl: MaaCustomControllerInfo,
    cb?: MaaAPICallback
  ) {
    // const set_option_cb = koffi.register((key, value) => {
    //   console.log(key, value)
    //   // return ctrl?.set_option()
    // }, 'MaaCustomControllerAPI_SetOption*')

    const connect_cb = koffi.register(() => {
      return ctrl?.connect?.() ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_Connect*')

    const click_cb = koffi.register((x: number, y: number) => {
      return ctrl?.click?.(x, y) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_Click*')

    const swipe_cb = koffi.register(
      (x1: number, y1: number, x2: number, y2: number, duration: number) => {
        return ctrl?.swipe?.(x1, y1, x2, y2, duration) ?? false ? 1 : 0
      },
      'MaaCustomControllerAPI_Swipe*'
    )

    const touch_down_cb = koffi.register(
      (contact: number, x: number, y: number, pressure: number) => {
        return ctrl?.touch_down?.(contact, x, y, pressure) ?? false ? 1 : 0
      },
      'MaaCustomControllerAPI_TouchDown*'
    )

    const touch_move_cb = koffi.register(
      (contact: number, x: number, y: number, pressure: number) => {
        return ctrl?.touch_move?.(contact, x, y, pressure) ?? false ? 1 : 0
      },
      'MaaCustomControllerAPI_TouchMove*'
    )

    const touch_up_cb = koffi.register((contact: number) => {
      return ctrl?.touch_up?.(contact) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_TouchUp*')

    const press_key_cb = koffi.register((key: number) => {
      return ctrl?.press_key?.(key) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_PressKey*')

    const start_app_cb = koffi.register((key: unknown) => {
      return ctrl?.start_app?.(koffi.decode(key, 'MaaStringView')) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_StartApp*')

    const stop_app_cb = koffi.register((key: unknown) => {
      return ctrl?.stop_app?.(koffi.decode(key, 'MaaStringView')) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_StopApp*')

    const get_resolution_cb = koffi.register((width: unknown, height: unknown) => {
      const res = ctrl?.get_resolution?.() ?? null
      if (res) {
        koffi.encode(width, 'int32_t', res[0])
        koffi.encode(height, 'int32_t', res[1])
        return 1
      } else {
        return 0
      }
    }, 'MaaCustomControllerAPI_GetResolution*')

    const get_image_cb = koffi.register((buffer: unknown) => {
      const ib = new MaaImageBuffer(l, buffer)
      return ctrl?.get_image?.(ib) ?? false ? 1 : 0
    }, 'MaaCustomControllerAPI_GetImage*')

    const get_uuid_cb = koffi.register((buffer: unknown) => {
      const sb = new MaaStringBuffer(l, buffer)
      const res = ctrl?.get_uuid?.() ?? null
      if (res) {
        return sb.set(res) ? 1 : 0
      } else {
        return 0
      }
    }, 'MaaCustomControllerAPI_GetUUID*')

    return new MaaController(
      l,
      c => {
        return l.func.MaaCustomControllerCreate(
          {
            // set_option: set_option_cb,

            connect: connect_cb,
            click: click_cb,
            swipe: swipe_cb,

            touch_down: touch_down_cb,
            touch_move: touch_move_cb,
            touch_up: touch_up_cb,

            press_key: press_key_cb,

            start_app: start_app_cb,
            stop_app: stop_app_cb,

            get_resolution: get_resolution_cb,
            get_image: get_image_cb,
            get_uuid: get_uuid_cb
          },
          c,
          0
        )
      },
      cb,
      () => {
        // koffi.unregister(set_option_cb)
        koffi.unregister(connect_cb)
        koffi.unregister(click_cb)
        koffi.unregister(swipe_cb)

        koffi.unregister(touch_down_cb)
        koffi.unregister(touch_move_cb)
        koffi.unregister(touch_up_cb)

        koffi.unregister(press_key_cb)

        koffi.unregister(start_app_cb)
        koffi.unregister(stop_app_cb)

        koffi.unregister(get_resolution_cb)
        koffi.unregister(get_image_cb)
        koffi.unregister(get_uuid_cb)
      }
    )
  }

  constructor(
    l: MaaFrameworkLoader,
    h: (c: koffi.IKoffiRegisteredCallback) => MaaControllerHandle,
    cb?: MaaAPICallback,
    od = () => {}
  ) {
    this.loader = l
    this.dispatcher = new Dispatcher(
      {
        [MaaMsg.Controller_Action_Started]: DispatcherStatus.Started,
        [MaaMsg.Controller_Action_Completed]: DispatcherStatus.Completed,
        [MaaMsg.Controller_Action_Failed]: DispatcherStatus.Failed
      },
      cb
    )
    this.callback = koffi.register(this.dispatcher.callback, MaaControllerCallback)
    this.handle = h(this.callback)
    this.onDestroy = od
  }

  destroy() {
    return new Promise<boolean>(resolve => {
      this.loader.func.MaaControllerDestroy.async(this.handle, (err: any, res: void) => {
        this.onDestroy()
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  setLongSide(size: number) {
    return !!this.loader.func.MaaControllerSetOptionInt(
      this.handle,
      MaaCtrlOptionEnum.ScreenshotTargetLongSide,
      [size],
      4
    )
  }

  setShortSide(size: number) {
    return !!this.loader.func.MaaControllerSetOptionInt(
      this.handle,
      MaaCtrlOptionEnum.ScreenshotTargetShortSide,
      [size],
      4
    )
  }

  setPackageEntry(entry: string) {
    return !!this.loader.func.MaaControllerSetOptionString(
      this.handle,
      MaaCtrlOptionEnum.DefaultAppPackageEntry,
      entry,
      entry.length
    )
  }

  setPackage(pkg: string) {
    return !!this.loader.func.MaaControllerSetOptionString(
      this.handle,
      MaaCtrlOptionEnum.DefaultAppPackage,
      pkg,
      pkg.length
    )
  }

  connect() {
    const id: MaaID = this.loader.func.MaaControllerPostConnection(this.handle)
    this.connectId = id
    return this.dispatcher.post(id).promise
  }

  click(x: number, y: number) {
    return this.dispatcher.post(this.loader.func.MaaControllerPostClick(this.handle, x, y))
  }

  swipe(x1: number, y1: number, x2: number, y2: number, duration: number) {
    return this.dispatcher.post(
      this.loader.func.MaaControllerPostSwipe(this.handle, x1, y1, x2, y2, duration)
    )
  }

  key(key: number) {
    return this.dispatcher.post(this.loader.func.MaaControllerPostPressKey(this.handle, key))
  }

  touchDown(contact: number, x: number, y: number, pressure: number) {
    return this.dispatcher.post(
      this.loader.func.MaaControllerPostTouchDown(this.handle, contact, x, y, pressure)
    )
  }

  touchMove(contact: number, x: number, y: number, pressure: number) {
    return this.dispatcher.post(
      this.loader.func.MaaControllerPostTouchMove(this.handle, contact, x, y, pressure)
    )
  }

  touchUp(contact: number) {
    return this.dispatcher.post(this.loader.func.MaaControllerPostTouchUp(this.handle, contact))
  }

  screencap() {
    return this.dispatcher.post(this.loader.func.MaaControllerPostScreencap(this.handle)).promise
  }

  image() {
    const ib = new MaaImageBuffer(this.loader)
    if (!this.loader.func.MaaControllerGetImage(this.handle, ib.handle)) {
      ib.destroy()
      return null
    }
    return ib
  }

  uuid() {
    const sb = new MaaStringBuffer(this.loader)
    if (!this.loader.func.MaaControllerGetUUID(this.handle, sb.handle)) {
      sb.destroy()
      return null
    }
    const str = sb.get()
    sb.destroy()
    return str
  }
}
