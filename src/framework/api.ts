import koffi from 'koffi'

import './types'

const protos = {
  MaaVersion: 'MaaStringView MaaVersion()',

  MaaCreateStringBuffer: 'MaaStringBufferHandle MaaCreateStringBuffer()',
  MaaDestroyStringBuffer: 'void MaaDestroyStringBuffer(MaaStringBufferHandle handle)',
  MaaGetString: 'void* MaaGetString(MaaStringBufferHandle handle)',
  MaaGetStringSize: 'MaaSize MaaGetStringSize(MaaStringBufferHandle handle)',
  MaaSetString: 'MaaBool MaaSetString(MaaStringBufferHandle handle, MaaStringView str)',
  MaaSetStringEx:
    'MaaBool MaaSetStringEx(MaaStringBufferHandle handle, MaaStringView str, MaaSize size)',

  MaaCreateImageBuffer: 'MaaImageBufferHandle MaaCreateImageBuffer()',
  MaaDestroyImageBuffer: 'void MaaDestroyImageBuffer(MaaImageBufferHandle handle)',
  MaaGetImageRawData: 'MaaImageRawData MaaGetImageRawData(MaaImageBufferHandle handle)',
  MaaGetImageWidth: 'int32_t MaaGetImageWidth(MaaImageBufferHandle handle)',
  MaaGetImageHeight: 'int32_t MaaGetImageHeight(MaaImageBufferHandle handle)',
  MaaGetImageType: 'int32_t MaaGetImageType(MaaImageBufferHandle handle)',
  MaaSetImageRawData:
    'MaaBool MaaSetImageRawData(MaaImageBufferHandle handle, MaaImageRawData data, int32_t width, int32_t height, int32_t type)',

  MaaGetImageEncoded: 'MaaImageEncodedData MaaGetImageEncoded(MaaImageBufferHandle handle)',
  MaaGetImageEncodedSize: 'MaaSize MaaGetImageEncodedSize(MaaImageBufferHandle handle)',
  MaaSetImageEncoded:
    'MaaBool MaaSetImageEncoded(MaaImageBufferHandle handle, MaaImageEncodedData data, MaaSize size)',

  MaaSetGlobalOption:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaSetGlobalOptionString:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, const char* value, MaaOptionValueSize val_size)',
  MaaSetGlobalOptionBool:
    'MaaBool MaaSetGlobalOption(MaaGlobalOption key, MaaStringBufferHandle buffer)',

  MaaResourceCreate:
    'MaaResourceHandle MaaResourceCreate(MaaResourceCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaResourceDestroy: 'void MaaResourceDestroy(MaaResourceHandle res)',
  MaaResourcePostPath: 'MaaResId MaaResourcePostPath(MaaResourceHandle res, MaaStringView path)',
  MaaResourceStatus: 'MaaStatus MaaResourceStatus(MaaResourceHandle res, MaaResId id)',
  MaaResourceWait: 'MaaStatus MaaResourceWait(MaaResourceHandle res, MaaResId id)',
  MaaResourceLoaded: 'MaaBool MaaResourceLoaded(MaaResourceHandle res)',
  MaaResourceSetOption:
    'MaaBool MaaResourceSetOption(MaaResourceHandle res, MaaResOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaResourceGetHash:
    'MaaSize MaaResourceGetHash(MaaResourceHandle res, MaaStringBufferHandle buffer)',

  MaaAdbControllerCreate:
    'MaaControllerHandle MaaAdbControllerCreate(MaaStringView adb_path, MaaStringView address, MaaAdbControllerType type, MaaStringView config, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaCustomControllerCreate:
    'MaaControllerHandle MaaCustomControllerCreate(MaaCustomControllerHandle handle, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaThriftControllerCreate:
    'MaaControllerHandle MaaThriftControllerCreate(MaaStringView param, MaaControllerCallback callback, MaaCallbackTransparentArg callback_arg)',

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
    'MaaCtrlId MaaControllerPostSwipe(MaaControllerHandle ctrl, int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t duration)',
  MaaControllerPostPressKey:
    'MaaCtrlId MaaControllerPostPressKey(MaaControllerHandle ctrl, int32_t keycode)',

  MaaControllerPostTouchDown:
    'MaaCtrlId MaaControllerPostTouchDown(MaaControllerHandle ctrl, int32_t contact, int32_t x, int32_t y, int32_t pressure)',
  MaaControllerPostTouchMove:
    'MaaCtrlId MaaControllerPostTouchMove(MaaControllerHandle ctrl, int32_t contact, int32_t x, int32_t y, int32_t pressure)',
  MaaControllerPostTouchUp:
    'MaaCtrlId MaaControllerPostTouchUp(MaaControllerHandle ctrl, int32_t contact)',

  MaaControllerPostScreencap: 'MaaCtrlId MaaControllerPostScreencap(MaaControllerHandle ctrl)',

  MaaControllerStatus: 'MaaStatus MaaControllerStatus(MaaControllerHandle ctrl, MaaCtrlId id)',
  MaaControllerWait: 'MaaStatus MaaControllerWait(MaaControllerHandle ctrl, MaaCtrlId id)',
  MaaControllerConnected: 'MaaBool MaaControllerConnected(MaaControllerHandle ctrl)',
  MaaControllerGetImage:
    'MaaBool MaaControllerGetImage(MaaControllerHandle ctrl, MaaImageBufferHandle buffer)',
  MaaControllerGetUUID:
    'MaaBool MaaControllerGetUUID(MaaControllerHandle ctrl, MaaImageBufferHandle buffer)',

  MaaCreate:
    'MaaInstanceHandle MaaCreate(MaaInstanceCallback callback, MaaCallbackTransparentArg callback_arg)',
  MaaDestroy: 'void MaaDestroy(MaaInstanceHandle inst)',
  MaaSetOption:
    'MaaBool MaaSetOption(MaaInstanceHandle inst, MaaInstOption key, MaaOptionValue value, MaaOptionValueSize val_size)',
  MaaBindResource: 'MaaBool MaaBindResource(MaaInstanceHandle inst, MaaResourceHandle res)',
  MaaBindController: 'MaaBool MaaBindController(MaaInstanceHandle inst, MaaControllerHandle ctrl)',
  MaaInited: 'MaaBool MaaInited(MaaInstanceHandle inst)',
  MaaRegisterCustomRecognizer:
    'MaaBool MaaRegisterCustomRecognizer(MaaInstanceHandle inst, MaaStringView name, MaaCustomRecognizerHandle recognizer)',
  MaaUnregisterCustomRecognizer:
    'MaaBool MaaUnregisterCustomRecognizer(MaaInstanceHandle inst, MaaStringView name)',
  MaaClearCustomRecognizer: 'MaaBool MaaClearCustomRecognizer(MaaInstanceHandle inst)',
  MaaRegisterCustomAction:
    'MaaBool MaaRegisterCustomAction(MaaInstanceHandle inst, MaaStringView name, MaaCustomActionHandle action)',
  MaaUnregisterCustomAction:
    'MaaBool MaaUnregisterCustomAction(MaaInstanceHandle inst, MaaStringView name)',
  MaaClearCustomAction: 'MaaBool MaaClearCustomAction(MaaInstanceHandle inst)',
  MaaPostTask:
    'MaaTaskId MaaPostTask(MaaInstanceHandle inst, MaaStringView task, MaaStringView param)',
  MaaSetTaskParam:
    'MaaBool MaaSetTaskParam(MaaInstanceHandle inst, MaaTaskId id, MaaStringView param)',
  MaaTaskStatus: 'MaaStatus MaaTaskStatus(MaaInstanceHandle inst, MaaTaskId id)',
  MaaWaitTask: 'MaaStatus MaaWaitTask(MaaInstanceHandle inst, MaaTaskId id)',
  MaaTaskAllFinished: 'MaaBool MaaTaskAllFinished(MaaInstanceHandle inst)',
  MaaStop: 'MaaBool MaaStop(MaaInstanceHandle inst)',
  MaaGetResource: 'MaaResourceHandle MaaGetResource(MaaInstanceHandle inst)',
  MaaGetController: 'MaaControllerHandle MaaGetController(MaaInstanceHandle inst)',

  MaaSyncContextRunTask:
    'MaaBool MaaSyncContextRunTask(MaaSyncContextHandle sync_context, MaaStringView task, MaaStringView param)',
  MaaSyncContextRunRecognizer:
    'MaaBool MaaSyncContextRunRecognizer(MaaSyncContextHandle sync_context, MaaImageBufferHandle image, MaaStringView task, MaaStringView task_param, _Out_ MaaRectHandle box, MaaStringBufferHandle detail_buff)',
  MaaSyncContextRunAction:
    'MaaBool MaaSyncContextRunAction(MaaSyncContextHandle sync_context, MaaStringView task, MaaStringView task_param, MaaRectHandle cur_box, MaaStringView cur_rec_detail)',
  MaaSyncContextClick:
    'MaaBool MaaSyncContextClick(MaaSyncContextHandle sync_context, int32_t x, int32_t y)',
  MaaSyncContextSwipe:
    'MaaBool MaaSyncContextSwipe(MaaSyncContextHandle sync_context, int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t duration)',
  MaaSyncContextPressKey:
    'MaaBool MaaSyncContextPressKey(MaaSyncContextHandle sync_context, int32_t keycode)',

  MaaSyncContextTouchDown:
    'MaaBool MaaSyncContextTouchDown(MaaSyncContextHandle sync_context, int32_t contact, int32_t x, int32_t y, int32_t pressure)',
  MaaSyncContextTouchMove:
    'MaaBool MaaSyncContextTouchMove(MaaSyncContextHandle sync_context, int32_t contact, int32_t x, int32_t y, int32_t pressure)',
  MaaSyncContextTouchUp:
    'MaaBool MaaSyncContextTouchUp(MaaSyncContextHandle sync_context, int32_t contact)',

  MaaSyncContextScreencap:
    'MaaBool MaaSyncContextScreencap(MaaSyncContextHandle sync_context, MaaImageBufferHandle buffer)',
  MaaSyncContextGetTaskResult:
    'MaaBool MaaSyncContextGetTaskResult(MaaSyncContextHandle sync_context, MaaStringView task, MaaStringBufferHandle buffer)'
}

export type MaaFrameworkExports = Record<keyof typeof protos, koffi.KoffiFunction>

export function getExports(lib: koffi.IKoffiLib) {
  const result: Record<string, koffi.KoffiFunction> = {}
  for (const key in protos) {
    result[key] = lib.func(protos[key as keyof typeof protos])
  }
  return result as MaaFrameworkExports
}
