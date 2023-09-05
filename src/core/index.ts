import koffi from 'koffi'
import path from 'path'

import { loadLibrary } from '../utils'
import { MaaCoreExports, load } from './api'

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
      this.loaded = true

      this.lib = loadLibrary(path.join(dir, 'MaaCore'))
      this.func = load(this.lib)

      // const version = this.func.AsstGetVersion() as string
      // if (version) {
      //   console.log('MaaCore version', version)
      // }
    } catch (err) {
      console.error((err as Error).message)
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
