import path from 'path'
import koffi from 'koffi'

import './types'
import { loadLibrary } from '../utils'
import { MaaFrameworkExports, load } from './api'

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
}
