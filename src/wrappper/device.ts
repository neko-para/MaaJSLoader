import { context } from '.'

export type { DeviceInfo } from '../base/device'

export class Device {
  static find() {
    return context.device.find()
  }

  static find_with_adb(adb: string) {
    return context.device.find_with_adb(adb)
  }
}
