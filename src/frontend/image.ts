import { context } from './context'
import type { ImageHandle } from './types'

export class Image {
  handle!: ImageHandle

  static init_from(h: ImageHandle) {
    const img = new Image()
    img.handle = h
    return img
  }

  static init() {
    return new Image().create()
  }

  async create() {
    this.handle = (await context['image.create']({}))!.handle! as ImageHandle
    return this
  }

  async destroy() {
    await context['image.destroy']({ handle: this.handle })
  }

  get empty() {
    return context['image.is_empty']({ handle: this.handle })
  }

  async clear() {
    await context['image.clear']({ handle: this.handle })
  }

  get info() {
    return context['image.info']({ handle: this.handle })
  }

  get encoded() {
    return context['image.encoded']({ handle: this.handle })
  }

  async set_encoded(buffer: Uint8Array) {
    await context['image.set_encoded']({ handle: this.handle, buffer })
  }
}
