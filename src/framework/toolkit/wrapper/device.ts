import { MaaToolKitLoader } from '..'
import { MaaAdbControllerType } from '../..'

export interface MaaDevice {
  name: string
  adbPath: string
  adbSerial: string
  adbControllerType: MaaAdbControllerType
  adbConfig: string
}

function MaaQueryDevice(loader: MaaToolKitLoader, idx: number): MaaDevice {
  return {
    name: loader.func.MaaToolKitGetDeviceName(idx),
    adbPath: loader.func.MaaToolKitGetDeviceAdbPath(idx),
    adbSerial: loader.func.MaaToolKitGetDeviceAdbSerial(idx),
    adbControllerType: loader.func.MaaToolKitGetDeviceAdbControllerType(idx),
    adbConfig: loader.func.MaaToolKitGetDeviceAdbConfig(idx)
  }
}

export function MaaFindDevice(loader: MaaToolKitLoader): MaaDevice[] {
  const size = loader.func.MaaToolKitFindDevice()
  return Array.from({ length: size }, (_, idx) => MaaQueryDevice(loader, idx))
}
