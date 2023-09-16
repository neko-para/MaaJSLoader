import koffi from 'koffi'
import * as path from 'path'

import { MaaAdbControllerType, MaaFrameworkLoader } from '..'
import { loadLibrary } from '../../utils'
import { MaaToolKitExports, getExports } from './api'

export * from './types'
export * from './wrapper'

export interface MaaDevice {
  name: string
  adbPath: string
  adbSerial: string
  adbControllerType: MaaAdbControllerType
  adbConfig: string
}

export class MaaToolKitLoader {
  loaded: boolean = false
  lib!: koffi.IKoffiLib
  func!: MaaToolKitExports
  framework: MaaFrameworkLoader

  constructor() {
    this.framework = new MaaFrameworkLoader()
  }

  load(dir: string) {
    if (this.loaded) {
      return
    }
    try {
      this.framework.load(dir)
      this.lib = loadLibrary(path.join(dir, 'MaaToolKit'))
      this.func = getExports(this.lib)
    } catch (err) {
      this.dispose()
      throw err
    }
    this.loaded = true
  }

  dispose() {
    if (!this.loaded) {
      return
    }
    this.loaded = false
    try {
      this.lib?.unload()
      this.framework.dispose()
    } catch (err) {
      throw err
    }
  }

  init() {
    return !!this.func.MaaToolKitInit()
  }

  uninit() {
    return !!this.func.MaaToolKitUninit()
  }

  get(key: string) {
    return this.func.MaaToolKitGetCustomInfo(key) as string | null
  }

  set(key: string, val: string) {
    return !!this.func.MaaToolKitSetCustomInfo(key, val)
  }

  query_device(idx: number): MaaDevice {
    return {
      name: this.func.MaaToolKitGetDeviceName(idx),
      adbPath: this.func.MaaToolKitGetDeviceAdbPath(idx),
      adbSerial: this.func.MaaToolKitGetDeviceAdbSerial(idx),
      adbControllerType: this.func.MaaToolKitGetDeviceAdbControllerType(idx),
      adbConfig: this.func.MaaToolKitGetDeviceAdbConfig(idx)
    }
  }

  find_device(): MaaDevice[] {
    const size = this.func.MaaToolKitFindDevice()
    return Array.from({ length: size }, (_, idx) => this.query_device(idx))
  }
}
