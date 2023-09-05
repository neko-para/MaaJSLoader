import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../../utils'
import { MaaToolKitExports, load } from './api'

export class MaaToolKitLoader {
  loaded: boolean = false
  lib!: koffi.IKoffiLib
  func!: MaaToolKitExports

  load(dir: string) {
    if (this.loaded) {
      return
    }
    try {
      this.loaded = true
      this.lib = loadLibrary(path.join(dir, 'MaaToolKit'))
      this.func = load(this.lib)
    } catch (err) {
      this.dispose()
      throw err
    }
  }

  dispose() {
    if (!this.loaded) {
      return
    }
    try {
      this.lib?.unload()
    } catch (err) {
      throw err
    }
    this.loaded = false
    return
  }

  init() {
    return !!this.func.MaaToolKitInit()
  }

  uninit() {
    return !!this.func.MaaToolKitUninit()
  }
}
