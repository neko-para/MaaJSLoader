import * as maarpc from '../gen'

export class ConfigClient {
  _client: maarpc.ConfigClient

  constructor(c: maarpc.ConfigClient) {
    this._client = c
  }

  async init() {
    await this._client.init(new maarpc.EmptyRequest())
  }

  async uninit() {
    await this._client.uninit(new maarpc.EmptyRequest())
  }
}
