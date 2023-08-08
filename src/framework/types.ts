import koffi from 'koffi'

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

export const MaaString = koffi.alias('MaaString', 'const char*')
export const MaaJsonString = koffi.alias('MaaJsonString', 'MaaString')

export const MaaStatus = koffi.alias('MaaStatus', 'int32')
export const enum MaaStatusEnum {
  Invalid = 0,
  Pending = 1000,
  Running = 2000,
  Success = 3000,
  Failed = 4000
}

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

export const MaaCallbackTransparentArg = koffi.alias('MaaCallbackTransparentArg', 'intptr')

export const MaaAPICallback_Prototype = koffi.proto(
  'void MaaAPICallback_Prototype(MaaString msg, MaaJsonString details_json, MaaCallbackTransparentArg callback_arg)'
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

export const MaaImage = koffi.struct('MaaImage', {
  rows: 'int32',
  cols: 'int32',
  type: 'int32',
  data: 'void*'
})

export const MaaCustomControllerAPI = koffi.struct('MaaCustomControllerAPI', {
  set_option: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_SetOption(MaaCtrlOption key, MaaString value)')
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
    koffi.proto('MaaBool MaaCustomControllerAPI_StartApp(MaaString package_name)')
  ),
  stop_app: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_StopApp(MaaString package_name)')
  ),

  get_resolution: koffi.pointer(
    koffi.proto('MaaBool MaaCustomControllerAPI_GetResolution(int32_t* width, int32_t* height)')
  ),
  get_image: koffi.pointer(
    koffi.proto('MaaSize MaaCustomControllerAPI_GetImage(uint8_t* buff, MaaSize buff_size)')
  ),
  get_uuid: koffi.pointer(
    koffi.proto('MaaSize MaaCustomControllerAPI_GetUUID(char* buff, MaaSize buff_size)')
  )
})
export const MaaCustomControllerHandle = koffi.alias(
  'MaaCustomControllerHandle',
  'MaaCustomControllerAPI*'
)

export const MaaRecognitionResultDetailBuffSize = 16384

export const MaaRecognitionResult = koffi.struct('MaaRecognitionResult', {
  box: 'MaaRect',
  detail_buf: 'char*' // this should be char
})

export const MaaCustomRecognizerAPI = koffi.struct('MaaCustomRecognizerAPI', {
  analyze: koffi.pointer(
    koffi.proto(
      'MaaBool MaaCustomRecognizerAPI_Analyze(const MaaImage* image, MaaJsonString custom_recognition_param, _Out_ MaaRecognitionResult* result)'
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
      'MaaBool MaaCustomActionAPI_Run(MaaJsonString custom_action_param, const MaaRect* cur_box, MaaJsonString recognition_result_detail)'
    )
  ),
  stop: koffi.pointer(koffi.proto('void MaaCustomActionAPI_Stop()'))
})
export const MaaCustomActionHandle = koffi.alias('MaaCustomActionHandle', 'MaaCustomActionAPI*')
