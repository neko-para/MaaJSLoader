import koffi from 'koffi'

import './types'

const protos = {
  MaaVersion: 'MaaString MaaVersion()',
  MaaSetGlobalOption:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaSetGlobalOptionString:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, const char* value, MaaOptionValueSize val_size)',
  MaaSetGlobalOptionBool:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, uint8_t* value, MaaOptionValueSize val_size)',

  MaaResourceCreate:
    'MaaResourceHandle MaaResourceCreate(MaaResourceCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaResourceDestroy: 'void MaaResourceDestroy(MaaResourceHandle res)',
  MaaResourcePostResource:
    'MaaResId MaaResourcePostResource(MaaResourceHandle res, MaaString path)',
  MaaResourceStatus: 'MaaStatus MaaResourceStatus(MaaResourceHandle res, MaaResId id)',
  MaaResourceWait: 'MaaStatus MaaResourceWait(MaaResourceHandle res, MaaResId id)',
  MaaResourceLoaded: 'MaaBool MaaResourceLoaded(MaaResourceHandle res)',
  MaaResourceSetOption:
    'MaaBool MaaResourceSetOption(MaaResourceHandle res, MaaResOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaResourceGetHash:
    'MaaSize MaaResourceGetHash(MaaResourceHandle res, char* buff, MaaSize buff_size)',

  MaaAdbControllerCreate:
    'MaaControllerHandle MaaAdbControllerCreate(MaaString adb_path, MaaString address, MaaAdbControllerType type, MaaJsonString config, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaCustomControllerCreate:
    'MaaControllerHandle MaaCustomControllerCreate(MaaCustomControllerHandle handle, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaThriftControllerCreate:
    'MaaControllerHandle MaaThriftControllerCreate(MaaString param, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaControllerDestroy: 'void MaaControllerDestroy(MaaControllerHandle ctrl)',
  MaaControllerSetOption:
    'MaaBool MaaControllerSetOption(MaaControllerHandle ctrl, MaaCtrlOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaControllerSetOptionString:
    'MaaBool MaaControllerSetOption(MaaControllerHandle ctrl, MaaCtrlOption key, const char* value, MaaOptionValueSize val_size)',
  MaaControllerSetOptionInt:
    'MaaBool MaaControllerSetOption(MaaControllerHandle ctrl, MaaCtrlOption key, int32_t* value, MaaOptionValueSize val_size)',

  MaaControllerPostConnection: 'MaaCtrlId MaaControllerPostConnection(MaaControllerHandle ctrl)',
  MaaControllerPostClick:
    'MaaCtrlId MaaControllerPostClick(MaaControllerHandle ctrl, int32_t x, int32_t y)',
  MaaControllerPostSwipe:
    'MaaCtrlId MaaControllerPostSwipe(MaaControllerHandle ctrl, int32_t* x_steps_buff, int32_t* y_steps_buff, int32_t* step_delay_buff, MaaSize buff_size)',
  MaaControllerPostScreencap: 'MaaCtrlId MaaControllerPostScreencap(MaaControllerHandle ctrl)',
  MaaControllerStatus: 'MaaStatus MaaControllerStatus(MaaControllerHandle ctrl, MaaCtrlId id)',
  MaaControllerWait: 'MaaStatus MaaControllerWait(MaaControllerHandle ctrl, MaaCtrlId id)',
  MaaControllerConnected: 'MaaBool MaaControllerConnected(MaaControllerHandle ctrl)',
  MaaControllerGetImage:
    'MaaSize MaaControllerGetImage(MaaControllerHandle ctrl, void* buff, MaaSize buff_size)',
  MaaControllerGetUUID:
    'MaaSize MaaControllerGetUUID(MaaControllerHandle ctrl, char* buff, MaaSize buff_size)',

  MaaCreate:
    'MaaInstanceHandle MaaCreate(MaaInstanceCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaDestroy: 'void MaaDestroy(MaaInstanceHandle inst)',
  MaaSetOption:
    'MaaBool MaaSetOption(MaaInstanceHandle inst, MaaInstOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaBindResource: 'MaaBool MaaBindResource(MaaInstanceHandle inst, MaaResourceHandle res)',
  MaaBindController: 'MaaBool MaaBindController(MaaInstanceHandle inst, MaaControllerHandle ctrl)',
  MaaInited: 'MaaBool MaaInited(MaaInstanceHandle inst)',
  MaaRegisterCustomRecognizer:
    'MaaBool MaaRegisterCustomRecognizer(MaaInstanceHandle inst, MaaString name, MaaCustomRecognizerHandle recognizer)',
  MaaUnregisterCustomRecognizer:
    'MaaBool MaaUnregisterCustomRecognizer(MaaInstanceHandle inst, MaaString name)',
  MaaClearCustomRecognizer: 'MaaBool MaaClearCustomRecognizer(MaaInstanceHandle inst)',
  MaaRegisterCustomAction:
    'MaaBool MaaRegisterCustomAction(MaaInstanceHandle inst, MaaString name, MaaCustomActionHandle action)',
  MaaUnregisterCustomAction:
    'MaaBool MaaUnregisterCustomAction(MaaInstanceHandle inst, MaaString name)',
  MaaClearCustomAction: 'MaaBool MaaClearCustomAction(MaaInstanceHandle inst)',
  MaaPostTask: 'MaaTaskId MaaPostTask(MaaInstanceHandle inst, MaaString task, MaaJsonString param)',
  MaaSetTaskParam:
    'MaaBool MaaSetTaskParam(MaaInstanceHandle inst, MaaTaskId id, MaaJsonString param)',
  MaaTaskStatus: 'MaaStatus MaaTaskStatus(MaaInstanceHandle inst, MaaTaskId id)',
  MaaWaitTask: 'MaaStatus MaaWaitTask(MaaInstanceHandle inst, MaaTaskId id)',
  MaaTaskAllFinished: 'MaaBool MaaTaskAllFinished(MaaInstanceHandle inst)',
  MaaStop: 'void MaaStop(MaaInstanceHandle inst)',
  MaaGetResource: 'MaaResourceHandle MaaGetResource(MaaInstanceHandle inst)',
  MaaGetController: 'MaaControllerHandle MaaGetController(MaaInstanceHandle inst)',

  MaaSyncContextRunTask:
    'MaaBool MaaSyncContextRunTask(MaaSyncContextHandle sync_context, MaaString task, MaaJsonString param)',
  MaaSyncContextClick:
    'void MaaSyncContextClick(MaaSyncContextHandle sync_context, int32_t x, int32_t y)',
  MaaSyncContextSwipe:
    'void MaaSyncContextSwipe(MaaSyncContextHandle sync_context, int32_t* x_steps_buff_, int32_t* y_steps_buff, int32_t* step_delay_buff, MaaSize buff_size)',
  MaaSyncContextScreencap:
    'MaaSize MaaSyncContextScreencap(MaaSyncContextHandle sync_context, void* buff, MaaSize buff_size)',
  MaaSyncContextGetTaskResult:
    'MaaSize MaaSyncContextGetTaskResult(MaaSyncContextHandle sync_context, MaaString task, char* buff, MaaSize buff_size)'
}

export type MaaFrameworkExports = Record<keyof typeof protos, koffi.KoffiFunction>

export function load(lib: koffi.IKoffiLib) {
  const result: Record<string, koffi.KoffiFunction> = {}
  for (const key in protos) {
    result[key] = lib.func(protos[key as keyof typeof protos])
  }
  return result as MaaFrameworkExports
}
