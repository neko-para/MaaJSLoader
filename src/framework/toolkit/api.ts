import koffi from 'koffi'

import '../types'
import './types'

const protos = {
  MaaToolKitInit: 'MaaBool MaaToolKitInit()',
  MaaToolKitUninit: 'MaaBool MaaToolKitUninit()',

  MaaToolKitFindDevice: 'MaaSize MaaToolKitFindDevice()',
  MaaToolKitFindDeviceWithAdb: 'MaaSize MaaToolKitFindDeviceWithAdb(MaaStringView adb_path)',
  MaaToolKitGetDeviceName: 'MaaStringView MaaToolKitGetDeviceName(MaaSize index)',
  MaaToolKitGetDeviceAdbPath: 'MaaStringView MaaToolKitGetDeviceAdbPath(MaaSize index)',
  MaaToolKitGetDeviceAdbSerial: 'MaaStringView MaaToolKitGetDeviceAdbSerial(MaaSize index)',
  MaaToolKitGetDeviceAdbControllerType:
    'MaaAdbControllerType MaaToolKitGetDeviceAdbControllerType(MaaSize index)',
  MaaToolKitGetDeviceAdbConfig: 'MaaStringView MaaToolKitGetDeviceAdbConfig(MaaSize index)',

  MaaToolKitGetCustomInfo: 'MaaStringView MaaToolKitGetCustomInfo(MaaStringView key)',
  MaaToolKitSetCustomInfo:
    'MaaBool MaaToolKitSetCustomInfo(MaaStringView key, MaaStringView value)',
  MaaToolKitConfigSize: 'MaaSize MaaToolKitConfigSize()',
  MaaToolKitGetConfig: 'MaaToolKitConfigHandle MaaToolKitGetConfig(MaaSize index)',

  MaaToolKitCurrentConfig: 'MaaToolKitConfigHandle MaaToolKitCurrentConfig()',

  MaaToolKitBindInstance:
    'MaaBool MaaToolKitBindInstance(MaaToolKitConfigHandle config_handle, MaaInstanceHandle instance_handle)',
  MaaToolKitAddConfig:
    'MaaToolKitConfigHandle MaaToolKitAddConfig(MaaStringView config_name, MaaToolKitConfigHandle copy_from)',
  MaaToolKitDelConfig: 'MaaBool MaaToolKitDelConfig(MaaStringView config_name)',
  MaaToolKitSetCurrentConfig: 'MaaBool MaaToolKitSetCurrentConfig(MaaStringView config_name)',

  MaaToolKitConfigName: 'MaaStringView MaaToolKitConfigName(MaaToolKitConfigHandle config_handle)',
  MaaToolKitGetConfigDescription:
    'MaaStringView MaaToolKitGetConfigDescription(MaaToolKitConfigHandle config_handle)',
  MaaToolKitSetConfigDescription:
    'MaaBool MaaToolKitSetConfigDescription(MaaToolKitConfigHandle config_handle, MaaStringView new_description)',

  MaaToolKitTaskSize: 'MaaSize MaaToolKitTaskSize(MaaToolKitConfigHandle config_handle)',
  MaaToolKitGetTask:
    'MaaToolKitTaskHandle MaaToolKitGetTask(MaaToolKitConfigHandle config_handle, MaaSize index)',

  MaaToolKitAddTask:
    'MaaToolKitTaskHandle MaaToolKitAddTask(MaaToolKitConfigHandle config_handle, MaaStringView task_name, MaaToolKitTaskHandle copy_from)',
  MaaToolKitDelTask:
    'MaaBool MaaToolKitDelTask(MaaToolKitConfigHandle config_handle, MaaStringView task_name)',
  MaaToolKitSetTaskIndex:
    'MaaBool MaaToolKitSetTaskIndex(MaaToolKitConfigHandle config_handle, MaaStringView task_name, MaaSize new_index)',

  MaaToolKitTaskName: 'MaaStringView MaaToolKitTaskName(MaaToolKitTaskHandle task_handle)',
  MaaToolKitGetTaskDescription:
    'MaaStringView MaaToolKitGetTaskDescription(MaaToolKitTaskHandle config_handle)',
  MaaToolKitSetTaskDescription:
    'MaaBool MaaToolKitSetTaskDescription(MaaToolKitTaskHandle config_handle, MaaStringView new_description)',
  MaaToolKitGetTaskEntry: 'MaaStringView MaaToolKitGetTaskEntry(MaaToolKitTaskHandle task_handle)',
  MaaToolKitSetTaskEntry:
    'MaaBool MaaToolKitSetTaskEntry(MaaToolKitTaskHandle task_handle, MaaStringView new_entry)',
  MaaToolKitGetTaskParam: 'MaaStringView MaaToolKitGetTaskParam(MaaToolKitTaskHandle task_handle)',
  MaaToolKitSetTaskParam:
    'MaaBool MaaToolKitSetTaskParam(MaaToolKitTaskHandle task_handle, MaaStringView new_param)',
  MaaToolKitGetTaskEnabled: 'MaaBool MaaToolKitGetTaskEnabled(MaaToolKitTaskHandle task_handle)',
  MaaToolKitSetTaskEnabled:
    'MaaBool MaaToolKitSetTaskEnabled(MaaToolKitTaskHandle task_handle, MaaBool new_enabled)',

  MaaToolKitPostAllTask: 'MaaBool MaaToolKitPostAllTask(MaaToolKitConfigHandle config_handle)',
  MaaToolKitWaitAllTask: 'MaaStatus MaaToolKitWaitAllTask(MaaToolKitConfigHandle config_handle)',
  MaaToolKitStopAllTask: 'MaaBool MaaToolKitStopAllTask(MaaToolKitConfigHandle config_handle)',

  MaaToolKitTaskStatus: 'MaaStatus MaaToolKitTaskStatus(MaaToolKitTaskHandle task_handle)',

  MaaToolKitGetRawResource:
    'MaaResourceHandle MaaToolKitGetRawResource(MaaToolKitConfigHandle config_handle)',
  MaaToolKitGetRawController:
    'MaaControllerHandle MaaToolKitGetRawController(MaaToolKitConfigHandle config_handle)',
  MaaToolKitGetRawInstance:
    'MaaInstanceHandle MaaToolKitGetRawInstance(MaaToolKitConfigHandle config_handle)'
}

export type MaaToolKitExports = Record<keyof typeof protos, koffi.KoffiFunction>

export function getExports(lib: koffi.IKoffiLib) {
  const result: Record<string, koffi.KoffiFunction> = {}
  for (const key in protos) {
    result[key] = lib.func(protos[key as keyof typeof protos])
  }
  return result as MaaToolKitExports
}
