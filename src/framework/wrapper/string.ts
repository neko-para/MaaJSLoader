import koffi from 'koffi'

import { MaaFrameworkLoader, MaaStringBufferHandle } from '..'

export class MaaStringBuffer {
  loader: MaaFrameworkLoader
  handle: MaaStringBufferHandle

  constructor(l: MaaFrameworkLoader, handle?: MaaStringBufferHandle) {
    this.loader = l
    if (handle) {
      this.handle = handle
    } else {
      this.handle = this.loader.func.MaaCreateStringBuffer()
    }
  }

  destroy() {
    this.loader.func.MaaDestroyStringBuffer(this.handle)
  }

  set(str: string) {
    return !!this.loader.func.MaaSetStringEx(this.handle, str, str.length)
  }

  get() {
    const ptr = this.loader.func.MaaGetString(this.handle)
    const len = this.loader.func.MaaGetStringSize(this.handle)
    if (len === 0) {
      return ''
    }
    return koffi.decode(ptr, koffi.array('char', len, 'String')) as string
  }
}
