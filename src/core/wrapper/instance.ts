import koffi, { IKoffiRegisteredCallback } from 'koffi'

import { AsstApiCallback, AsstHandle, AsstInstanceOptionKeyEnum, AsstMsg, MaaCoreLoader } from '..'
import { PromiseInfo, getPromise } from '../../utils'

type AsyncCallInfo = {
  uuid: string
  what: 'Connect' | 'Click' | 'Screencap'
  async_call_id: number
  details: {
    ret: boolean
    cost: bigint | number
  }
}

export class AsstInstance {
  loader: MaaCoreLoader
  callback: IKoffiRegisteredCallback
  handle: AsstHandle

  asyncCallInfo: Record<number, PromiseInfo<AsyncCallInfo['details']>>

  constructor(l: MaaCoreLoader, cb?: AsstApiCallback) {
    this.loader = l
    const callback: AsstApiCallback = (msg, details_json, custom_arg) => {
      if (msg === AsstMsg.AsyncCallInfo) {
        const info = JSON.parse(details_json) as AsyncCallInfo
        if (info.async_call_id in this.asyncCallInfo) {
          this.asyncCallInfo[info.async_call_id].resolve(info.details)
          delete this.asyncCallInfo[info.async_call_id]
        } else {
          this.asyncCallInfo[info.async_call_id] = getPromise()
          this.asyncCallInfo[info.async_call_id].resolve(info.details)
        }
      }
      cb?.(msg, details_json, custom_arg)
    }
    this.callback = koffi.register(callback, AsstApiCallback)
    this.handle = this.loader.func.AsstCreateEx(this.callback, 0)
    this.asyncCallInfo = {}
  }

  destroy() {
    this.loader.func.AsstDestroy(this.handle)
  }

  setTouchMode(mode: 'minitouch' | 'maatouch' | 'adb') {
    return !!this.loader.func.AsstSetInstanceOption(
      this.handle,
      AsstInstanceOptionKeyEnum.TouchMode,
      mode
    )
  }

  setDeploymentWithPause(on: boolean) {
    return !!this.loader.func.AsstSetInstanceOption(
      this.handle,
      AsstInstanceOptionKeyEnum.DeploymentWithPause,
      on ? '1' : '0'
    )
  }

  setAdbLiteEnabled(on: boolean) {
    return !!this.loader.func.AsstSetInstanceOption(
      this.handle,
      AsstInstanceOptionKeyEnum.AdbLiteEnabled,
      on ? '1' : '0'
    )
  }

  setKillAdbOnExit(on: boolean) {
    return !!this.loader.func.AsstSetInstanceOption(
      this.handle,
      AsstInstanceOptionKeyEnum.KillAdbOnExit,
      on ? '1' : '0'
    )
  }

  connect(adb_path: string, address: string, config: string) {
    const id: number = this.loader.func.AsstAsyncConnect(
      this.handle,
      adb_path,
      address,
      config,
      false
    )
    if (id in this.asyncCallInfo) {
      const pro = this.asyncCallInfo[id].promise
      delete this.asyncCallInfo[id]
      return pro
    } else {
      this.asyncCallInfo[id] = getPromise()
      return this.asyncCallInfo[id].promise
    }
  }
}
