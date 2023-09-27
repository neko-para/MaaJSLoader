import * as maarpc from '../../gen'

export type ResourceHandle = string & { __brand: 'ResourceHandle' }
export type ResourceActionId = number & { __brand: 'ResourceActionId' }

export class ResourceClient {
  _client: maarpc.ResourceClient

  constructor(c: maarpc.ResourceClient) {
    this._client = c
  }

  async create(id: string) {
    return (await this._client.create(new maarpc.IdRequest({ id }))).handle as ResourceHandle
  }

  async destroy(handle: ResourceHandle) {
    await this._client.destroy(new maarpc.HandleRequest({ handle }))
  }

  async post_path(handle: ResourceHandle, path: string) {
    return (await this._client.post_path(new maarpc.HandleStringRequest({ handle, str: path })))
      .id as ResourceActionId
  }

  async status(handle: ResourceHandle, id: ResourceActionId) {
    return (await this._client.status(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async wait(handle: ResourceHandle, id: ResourceActionId) {
    return (await this._client.wait(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async loaded(handle: ResourceHandle) {
    return (await this._client.loaded(new maarpc.HandleRequest({ handle }))).bool
  }

  async hash(handle: ResourceHandle) {
    return (await this._client.hash(new maarpc.HandleRequest({ handle }))).str
  }
}
