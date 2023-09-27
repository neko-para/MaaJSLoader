import * as maarpc from '../../gen'

export type ImageHandle = string & { __brand: 'ImageHandle' }

export class ImageClient {
  _client: maarpc.ImageClient

  constructor(c: maarpc.ImageClient) {
    this._client = c
  }

  async create() {
    return (await this._client.create(new maarpc.EmptyRequest())).handle as ImageHandle
  }

  async destroy(handle: ImageHandle) {
    await this._client.destroy(new maarpc.HandleRequest({ handle }))
  }

  async is_empty(handle: ImageHandle) {
    return (await this._client.is_empty(new maarpc.HandleRequest({ handle }))).bool
  }

  async clear(handle: ImageHandle) {
    await this._client.clear(new maarpc.HandleRequest({ handle }))
  }

  async info(handle: ImageHandle) {
    const info = await this._client.info(new maarpc.HandleRequest({ handle }))
    const size = info.size
    return {
      type: info.type,
      width: size.width,
      height: size.height
    }
  }

  async encoded(handle: ImageHandle) {
    return (await this._client.encoded(new maarpc.HandleRequest({ handle }))).buf
  }

  async setEncoded(handle: ImageHandle, buffer: Uint8Array) {
    return (await this._client.set_encoded(new maarpc.HandleBufferRequest({ handle, buffer }))).bool
  }
}
