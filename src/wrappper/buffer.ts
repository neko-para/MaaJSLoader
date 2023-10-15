import { context } from '.'
import { ImageHandle } from '../base'

export class Image {
  handle!: ImageHandle

  static init_from(from: ImageHandle) {
    const img = new Image()
    img.handle = from
    return img
  }

  static init() {
    return new Image().create()
  }

  async create() {
    this.handle = await context['image.create']()
    return this
  }

  async destroy() {
    await context['image.destroy'](this.handle)
  }

  get empty() {
    return context['image.is_empty'](this.handle)
  }

  async clear() {
    await context['image.clear'](this.handle)
  }

  get info() {
    return context['image.info'](this.handle)
  }

  get encoded() {
    return context['image.encoded'](this.handle)
  }

  async set_encoded(buffer: Uint8Array) {
    await context['image.setEncoded'](this.handle, buffer)
  }
}
