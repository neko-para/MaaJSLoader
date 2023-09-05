import koffi from 'koffi'

export const MaaToolKitConfigAPI = koffi.opaque('MaaToolKitConfigAPI')
export const MaaToolKitConfigHandle = koffi.alias('MaaToolKitConfigHandle', 'MaaToolKitConfigAPI*')
export type MaaToolKitConfigHandle = unknown

export const MaaToolKitTaskAPI = koffi.opaque('MaaToolKitTaskAPI')
export const MaaToolKitTaskHandle = koffi.alias('MaaToolKitTaskHandle', 'MaaToolKitTaskAPI*')
export type MaaToolKitTaskHandle = unknown
