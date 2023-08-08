import koffi, { IKoffiRegisteredCallback } from 'koffi'

import { MaaFrameworkLoader } from '..'
import { MaaMsg } from '../msg'
import {
  MaaAPICallback,
  MaaAdbControllerTypeEnum,
  MaaControllerCallback,
  MaaControllerHandle,
  MaaCtrlOptionEnum,
  MaaID
} from '../types'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export class MaaController {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: IKoffiRegisteredCallback
  handle: MaaControllerHandle
  connectId?: MaaID

  constructor(
    l: MaaFrameworkLoader,
    adb: string,
    address: string,
    type: number,
    config: string,
    cb?: MaaAPICallback
  ) {
    this.loader = l
    this.dispatcher = new Dispatcher(
      {
        [MaaMsg.Controller_Action_Started]: DispatcherStatus.Started,
        [MaaMsg.Controller_Action_Completed]: DispatcherStatus.Completed,
        [MaaMsg.Controller_Action_Failed]: DispatcherStatus.Failed
      },
      (msg, detail) => {
        switch (msg) {
          case MaaMsg.Controller_ConnectSuccess:
            if (this.connectId) {
              this.dispatcher.trigger(this.connectId, DispatcherStatus.Completed)
            }
            break
          case MaaMsg.Controller_ConnectFailed:
            if (this.connectId) {
              this.dispatcher.trigger(this.connectId, DispatcherStatus.Failed)
            }
            break
          default:
            cb?.(msg, detail)
        }
      }
    )
    this.callback = koffi.register(this.dispatcher.callback, MaaControllerCallback)
    this.handle = this.loader.func.MaaAdbControllerCreate(
      adb,
      address,
      type,
      config,
      this.callback,
      0
    )
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
    return this.dispatcher.post(this.loader.func.MaaControllerPostScreencap(this.handle))
  }

  // image()
  // uuid()
}
