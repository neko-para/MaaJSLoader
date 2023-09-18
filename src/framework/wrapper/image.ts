import koffi from 'koffi'

import { MaaFrameworkLoader, MaaImageBufferHandle } from '..'

export class MaaImageBuffer {
  loader: MaaFrameworkLoader
  handle: MaaImageBufferHandle

  constructor(l: MaaFrameworkLoader, handle?: MaaImageBufferHandle) {
    this.loader = l
    if (handle) {
      this.handle = handle
    } else {
      this.handle = this.loader.func.MaaCreateImageBuffer()
    }
  }

  destroy() {
    this.loader.func.MaaDestroyImageBuffer(this.handle)
  }

  get empty() {
    return !!this.loader.func.MaaIsImageEmpty(this.handle)
  }

  clear() {
    return !!this.loader.func.MaaClearImage(this.handle)
  }

  width() {
    return this.loader.func.MaaGetImageWidth(this.handle) as number
  }

  height() {
    return this.loader.func.MaaGetImageHeight(this.handle) as number
  }

  type() {
    return this.loader.func.MaaGetImageType(this.handle) as number
  }

  data(len: number) {
    if (len === 0) {
      return new Uint8Array()
    }
    const ptr = this.loader.func.MaaGetImageRawData(this.handle)
    return koffi.decode(ptr, koffi.array('uint8_t', len, 'Typed')) as Uint8Array
  }

  setData(data: Uint8Array, width: number, height: number, type: number) {
    return !!this.loader.func.MaaSetImageRawData(this.handle, data, width, height, type)
  }

  encoded() {
    const ptr = this.loader.func.MaaGetImageEncoded(this.handle)
    const len = this.loader.func.MaaGetImageEncodedSize(this.handle)
    if (len === 0) {
      return new Uint8Array()
    }
    return koffi.decode(ptr, koffi.array('uint8_t', len, 'Typed')) as Uint8Array
  }

  setEncoded(data: Uint8Array) {
    return !!this.loader.func.MaaSetImageEncoded(this.handle, data, data.length)
  }
}
