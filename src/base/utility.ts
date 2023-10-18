import * as grpc from '@grpc/grpc-js'

import * as maarpc from '../gen'

export class UtilityClient {
  _client: maarpc.UtilityClient

  constructor(c: maarpc.UtilityClient) {
    this._client = c
  }

  async version() {
    return (await this._client.version(new maarpc.EmptyRequest())).str
  }

  async set_logging(path: string) {
    await this._client.set_global_option(new maarpc.SetGlobalOptionRequest({ logging: path }))
  }

  async set_debug_mode(mode: boolean) {
    await this._client.set_global_option(new maarpc.SetGlobalOptionRequest({ debug_mode: mode }))
  }

  async acquire_id() {
    return (await this._client.acquire_id(new maarpc.EmptyRequest())).id
  }

  async register_callback(id: string, cb: (msg: string, detail: string) => void) {
    const stream = this._client.register_callback(
      new maarpc.IdRequest({ id })
    ) as unknown as grpc.ClientReadableStream<maarpc.Callback>
    await new Promise<void>(resolve => {
      stream.on('readable', () => {
        const res = stream.read()
        if (!res) {
          return
        }
        if (res.msg === 'Rpc.Inited') {
          resolve()
        } else {
          cb(res.msg, res.detail)
        }
      })
    })
    return stream
  }

  async unregister_callback(id: string) {
    await this._client.unregister_callback(new maarpc.IdRequest({ id }))
  }
}
