import koffi from 'koffi'

export const MaaStringBufferAPI = koffi.opaque('MaaStringBuffer')
export const MaaStringBufferHandle = koffi.alias('MaaStringBufferHandle', 'MaaStringBuffer*')
export type MaaStringBufferHandle = unknown

export const MaaImageBufferAPI = koffi.opaque('MaaImageBuffer')
export const MaaImageBufferHandle = koffi.alias('MaaImageBufferHandle', 'MaaImageBuffer*')
export type MaaImageBufferHandle = unknown

export const MaaResourceAPI = koffi.opaque('MaaResourceAPI')
export const MaaResourceHandle = koffi.alias('MaaResourceHandle', 'MaaResourceAPI*')
export type MaaResourceHandle = unknown

export const MaaControllerAPI = koffi.opaque('MaaControllerAPI')
export const MaaControllerHandle = koffi.alias('MaaControllerHandle', 'MaaControllerAPI*')
export type MaaControllerHandle = unknown

export const MaaInstanceAPI = koffi.opaque('MaaInstanceAPI')
export const MaaInstanceHandle = koffi.alias('MaaInstanceHandle', 'MaaInstanceAPI*')
export type MaaInstanceHandle = unknown

export const MaaSyncContextAPI = koffi.opaque('MaaSyncContextAPI')
export const MaaSyncContextHandle = koffi.alias('MaaSyncContextHandle', 'MaaSyncContextAPI*')
export type MaaSyncContextHandle = unknown

export const MaaBool = koffi.alias('MaaBool', 'uint8')
export const MaaSize = koffi.alias('MaaSize', 'uint64')
export const MaaNullSize = 0xffffffffffffffffn

export const MaaStringView = koffi.alias('MaaStringView', 'const char*')

export const MaaStatus = koffi.alias('MaaStatus', 'int32')
export const enum MaaStatusEnum {
  Invalid = 0,
  Pending = 1000,
  Running = 2000,
  Success = 3000,
  Failed = 4000
}
export type MaaStatus = number

export const MaaId = koffi.alias('MaaId', 'int64')
export type MaaID = bigint
export const MaaCtrlId = koffi.alias('MaaCtrlId', 'MaaId')
export const MaaResId = koffi.alias('MaaResId', 'MaaId')
export const MaaTaskId = koffi.alias('MaaTaskId', 'MaaId')
export const MaaInvalidId = 0

export const MaaOption = koffi.alias('MaaOption', 'int32')
export const MaaOptionValue = koffi.alias('MaaOptionValue', 'void*')
export const MaaOptionValueSize = koffi.alias('MaaOptionValueSize', 'uint64')

export const MaaGlobalOption = koffi.alias('MaaGlobalOption', 'MaaOption')
export const enum MaaGlobalOptionEnum {
  Invalid = 0,
  Logging = 1,
  DebugMode = 2
}

export const MaaResOption = koffi.alias('MaaResOption', 'MaaOption')
export const enum MaaResOptionEnum {
  Invalid = 0
}

export const MaaCtrlOption = koffi.alias('MaaCtrlOption', 'MaaOption')
export const enum MaaCtrlOptionEnum {
  Invalid = 0,
  ScreenshotTargetWidth = 1,
  ScreenshotTargetHeight = 2,
  DefaultAppPackageEntry = 3,
  DefaultAppPackage = 4
}

export const MaaInstOption = koffi.alias('MaaInstOption', 'MaaOption')
export const enum MaaInstOptionEnum {
  Invalid = 0
}

export const MaaTaskParam_Empty = {}

export const MaaAdbControllerType = koffi.alias('MaaAdbControllerType', 'int32')
export const enum MaaAdbControllerTypeEnum {
  Touch_Adb = 1,
  Touch_MiniTouch = 2,
  Touch_MaaTouch = 3,
  Touch_Mask = 0xff,

  Key_Adb = 1 << 8,
  Key_MaaTouch = 2 << 8,
  Key_Mask = 0xff00,

  Screencap_FastestWay = 1 << 16,
  Screencap_RawByNetcat = 2 << 16,
  Screencap_RawWithGzip = 3 << 16,
  Screencap_Encode = 4 << 16,
  Screencap_EncodeToFile = 5 << 16,
  Screencap_MinicapDirect = 6 << 16,
  Screencap_MinicapStream = 7 << 16,
  Screencap_Mask = 0xff0000,

  Input_Preset_Adb = Touch_Adb | Key_Adb,
  Input_Preset_Minitouch = Touch_MiniTouch | Key_Adb,
  Input_Preset_Maatouch = Touch_MaaTouch | Key_MaaTouch
}
export type MaaAdbControllerType = number

export const MaaCallbackTransparentArg = koffi.alias('MaaCallbackTransparentArg', 'intptr')

export const MaaAPICallback_Prototype = koffi.proto(
  'void MaaAPICallback_Prototype(MaaStringView msg, MaaStringView details_json, MaaCallbackTransparentArg callback_arg)'
)

export const MaaAPICallback = koffi.alias('MaaAPICallback', koffi.pointer(MaaAPICallback_Prototype))
export const MaaResourceCallback = koffi.alias('MaaResourceCallback', 'MaaAPICallback')
export const MaaControllerCallback = koffi.alias('MaaControllerCallback', 'MaaAPICallback')
export const MaaInstanceCallback = koffi.alias('MaaInstanceCallback', 'MaaAPICallback')
export type MaaAPICallback = (msg: string, details: string) => void

export const MaaRect = koffi.struct('MaaRect', {
  x: 'int32',
  y: 'int32',
  width: 'int32',
  height: 'int32'
})
export const MaaRectHandle = koffi.alias('MaaRectHandle', 'MaaRect*')
export type MaaRectHandle = unknown

export const MaaCustomControllerAPI = koffi.struct('MaaCustomControllerAPI', {
  set_option: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_SetOption(MaaCtrlOption key, MaaStringView value)')
  ),

  connect: koffi.pointer(koffi.proto('MaaBool MaaCustomControllerAPI_Connect(void)')),
  click: koffi.pointer(koffi.proto('MaaBool MaaCustomControllerAPI_Click(int32_t x, int32_t y)')),
  swipe: koffi.pointer(
    koffi.proto(
      'MaaBool MaaCustomControllerAPI_Swipe(int32_t* x_steps_buff, int32_t* y_steps_buff, int32_t* step_delay_buff, MaaSize buff_size)'
    )
  ),
  press_key: koffi.pointer(koffi.proto('MaaBool MaaCustomControllerAPI_PressKey(int32_t keycode)')),

  start_app: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_StartApp(MaaStringView package_name)')
  ),
  stop_app: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_StopApp(MaaStringView package_name)')
  ),

  get_resolution: koffi.pointer(
    koffi.proto(
      'MaaBool MaaCustomControllerAPI_GetResolution(_Out_ int32_t* width, _Out_ int32_t* height)'
    )
  ),
  get_image: koffi.pointer(
    koffi.proto('MaaSize MaaCustomControllerAPI_GetImage(_Out_ uint8_t* buff, MaaSize buff_size)')
  ),
  get_uuid: koffi.pointer(
    koffi.proto('MaaSize MaaCustomControllerAPI_GetUUID(_Out_ char* buff, MaaSize buff_size)')
  )
})
export const MaaCustomControllerHandle = koffi.alias(
  'MaaCustomControllerHandle',
  'MaaCustomControllerAPI*'
)

export const MaaCustomRecognizerAPI = koffi.struct('MaaCustomRecognizerAPI', {
  analyze: koffi.pointer(
    koffi.proto(
      'MaaBool MaaCustomRecognizerAPI_Analyze(MaaSyncContextHandle sync_context, const MaaImageBufferHandle image, MaaStringView task_name, MaaStringView custom_recognition_param, MaaRectHandle box, MaaStringBufferHandle detail_buff)'
    )
  )
})
export const MaaCustomRecognizerHandle = koffi.alias(
  'MaaCustomRecognizerHandle',
  'MaaCustomRecognizerAPI*'
)

export const MaaCustomActionAPI = koffi.struct('MaaCustomActionAPI', {
  run: koffi.pointer(
    koffi.proto(
      'MaaBool MaaCustomActionAPI_Run(MaaSyncContextHandle sync_context, MaaStringView task_name, MaaStringView custom_action_param, MaaRectHandle cur_box, MaaStringView cur_rec_detail)'
    )
  ),
  stop: koffi.pointer(koffi.proto('void MaaCustomActionAPI_Stop()'))
})
export const MaaCustomActionHandle = koffi.alias('MaaCustomActionHandle', 'MaaCustomActionAPI*')

export const MaaImageRawData = koffi.alias('MaaImageRawData', 'void*')
export type MaaImageRawData = unknown

export const MaaImageEncodedData = koffi.alias('MaaImageEncodedData', 'void*')
export type MaaImageEncodedData = unknown
