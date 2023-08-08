import path from 'path'
import koffi, { IKoffiRegisteredCallback } from 'koffi'

import './types'
import { loadLibrary } from '../utils'
import { MaaFrameworkExports, load } from './api'
import {
  MaaAPICallback,
  MaaGlobalOptionEnum,
  MaaResID,
  MaaResourceCallback,
  MaaResourceHandle
} from './types'

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

export class MaaResource {
  loader: MaaFrameworkLoader
  callback: IKoffiRegisteredCallback
  handle: MaaResourceHandle

  constructor(l: MaaFrameworkLoader, cb: MaaAPICallback) {
    this.loader = l
    const func: MaaAPICallback = (msg, detail) => {
      console.log(msg, detail)
      cb(msg, detail)
    }
    this.callback = koffi.register(func, MaaResourceCallback)
    this.handle = this.loader.func.MaaResourceCreate(this.callback, 0)
  }

  destroy() {}

  post(path: string): MaaResID {
    return this.loader.func.MaaResourcePostResource(this.handle, path)
  }
}
