import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../utils'
import { MaaFrameworkExports, load } from './api'
import { MaaGlobalOptionEnum } from './types'

export * from './types'

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
      this.func = load(this.lib)

      // const version = this.func.MaaVersion() as string
      // if (version) {
      //   console.log('MaaFramework version', version)
      // }
    } catch (err) {
      // console.error((err as Error).message)
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
      // console.error((err as Error).message)
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
