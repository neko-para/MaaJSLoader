import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../utils'
import { MaaFrameworkExports, load } from './api'
import './types'
import { MaaGlobalOptionEnum } from './types'

export class MaaFrameworkLoader {
  loaded: boolean = false
  lib!: koffi.IKoffiLib
  func!: MaaFrameworkExports

  load(dir: string) {
    if (this.loaded) {
      return true
    }
    try {
      this.loaded = true

      this.lib = loadLibrary(path.join(dir, 'MaaFramework'))
      this.func = load(this.lib)

      const version = this.func.MaaVersion() as string
      if (version) {
        console.log('MaaFramework version', version)
      }
      return true
    } catch (err) {
      console.error((err as Error).message)
      this.dispose()
      return false
    }
  }

  dispose() {
    if (!this.loaded) {
      return true
    }
    try {
      this.lib.unload()
    } catch (err) {
      console.error((err as Error).message)
      return false
    }
    this.loaded = false
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
