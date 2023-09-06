import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../utils'
import { MaaCoreExports, getExports } from './api'

export * from './types'
export * from './wrapper'

export class MaaCoreLoader {
  loaded: boolean = false
  lib!: koffi.IKoffiLib
  func!: MaaCoreExports

  load(dir: string) {
    if (this.loaded) {
      return
    }
    try {
      this.lib = loadLibrary(path.join(dir, 'MaaCore'))
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
    } catch (err) {
      throw err
    }
  }

  version() {
    return this.func.AsstGetVersion() as string
  }

  log(level: string, message: string) {
    this.func.AsstLog(level, message)
  }

  setUserDir(path: string) {
    return !!this.func.AsstSetUserDir(path)
  }

  loadResource(path: string) {
    return !!this.func.AsstLoadResource(path)
  }

  getNullSize() {
    return this.func.AsstGetNullSize() as number
  }
}
