import koffi from 'koffi'
import path from 'path'

import { MaaFrameworkLoader } from '..'
import { loadLibrary } from '../../utils'
import { MaaToolKitExports, load } from './api'

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
      this.func = load(this.lib)
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
}
