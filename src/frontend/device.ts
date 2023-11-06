import { context } from './context'

export interface DeviceInfo {
  name: string
  adb_path: string
  adb_serial: string
  adb_type: number
  adb_config: string
}

export class Device {
  static async find() {
    return (await context['device.find']({}))!.info! as DeviceInfo[]
  }

  static async find_with_adb(adb: string) {
    return (await context['device.find_with_adb']({ str: adb }))!.info! as DeviceInfo[]
  }
}
