import * as maarpc from '../../gen'

export interface DeviceInfo {
  name: string
  adb_path: string
  adb_serial: string
  adb_type: number
  adb_config: string
}

function filter(i: maarpc.DeviceInfo): DeviceInfo {
  const info: DeviceInfo = {
    name: i.name,
    adb_path: i.adb_path,
    adb_serial: i.adb_serial,
    adb_type: i.adb_type,
    adb_config: i.adb_config
  }
  return info
}

export class DeviceClient {
  _client: maarpc.DeviceClient

  constructor(c: maarpc.DeviceClient) {
    this._client = c
  }

  async find() {
    return (await this._client.find(new maarpc.EmptyRequest())).info.map(filter)
  }

  async find_with_adb(adb: string) {
    return (await this._client.find_with_adb(new maarpc.StringRequest({ str: adb }))).info.map(
      filter
    )
  }
}
