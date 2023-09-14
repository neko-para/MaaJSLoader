import koffi from 'koffi'
import * as path from 'path'

import { MaaFrameworkLoader } from '..'
import { loadLibrary } from '../../utils'
import { MaaToolKitExports, getExports } from './api'

export * from './types'
export * from './wrapper'

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
}
