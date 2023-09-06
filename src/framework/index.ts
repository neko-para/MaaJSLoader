import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../utils'
import { MaaFrameworkExports, getExports } from './api'
import { MaaGlobalOptionEnum } from './types'

export * from './types'
export * from './wrapper'

export class MaaFrameworkLoader {
  loaded: boolean = false
  lib!: koffi.IKoffiLib
  func!: MaaFrameworkExports

  load(dir: string) {
    if (this.loaded) {
      return
    }
    try {
      this.loaded = true
      this.lib = loadLibrary(path.join(dir, 'MaaFramework'))
      this.func = getExports(this.lib)
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

  version() {
    return this.func.MaaVersion() as string
  }

  setLogging(dir: string) {
    return !!this.func.MaaSetGlobalOptionString(MaaGlobalOptionEnum.Logging, dir, dir.length)
  }

  setDebugMode(debug: boolean) {
    return !!this.func.MaaSetGlobalOptionBool(MaaGlobalOptionEnum.DebugMode, [debug ? 1 : 0], 1)
  }
}
