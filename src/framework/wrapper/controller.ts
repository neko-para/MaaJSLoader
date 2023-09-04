import koffi, { IKoffiRegisteredCallback } from 'koffi'

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

export class MaaController {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: IKoffiRegisteredCallback
  handle: MaaControllerHandle
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
    ctrl: {
      connect: () => boolean

      // get_resolution: () => null | [number, number]
      // get_image: () => Uint8Array
      // get_uuid: () => string
    },
    cb?: MaaAPICallback
  ) {
    const connect_callback = koffi.register(() => {
      console.log('custom controller: connect')
      return ctrl.connect()
    }, 'MaaCustomControllerAPI_Connect*')
    return new MaaController(
      l,
      c => {
        return l.func.MaaCustomControllerCreate(
          {
            connect: connect_callback
          },
          c,
          0
        )
      },
      cb
    )
  }

  constructor(
    l: MaaFrameworkLoader,
    h: (c: IKoffiRegisteredCallback) => MaaControllerHandle,
    cb?: MaaAPICallback
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
  }

  destroy() {
    this.loader.func.MaaControllerDestroy(this.handle)
  }

  setWidth(width: number) {
    return !!this.loader.func.MaaControllerSetOptionInt(
      this.handle,
      MaaCtrlOptionEnum.ScreenshotTargetWidth,
      [width],
      4
    )
  }

  setHeight(height: number) {
    return !!this.loader.func.MaaControllerSetOptionInt(
      this.handle,
      MaaCtrlOptionEnum.ScreenshotTargetHeight,
      [height],
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

  swipe(steps: { x: number; y: number; delay: number }[]) {
    const xs = steps.map(({ x }) => x)
    const ys = steps.map(({ y }) => y)
    const ss = steps.map(({ delay }) => delay)
    return this.dispatcher.post(
      this.loader.func.MaaControllerPostSwipe(this.handle, xs, ys, ss, steps.length)
    )
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
