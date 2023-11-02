export type Callback = (msg: string, details: string) => void
export const enum Status {
  Pending = 1000,
  Running = 2000,
  Success = 3000,
  Failed = 4000
}
export const enum LoggingLevel {
  Off = 0,
  Fatal = 1,
  Error = 2,
  Warn = 3,
  Info = 4,
  Debug = 5,
  Trace = 6,
  All = 7
}
export const enum AdbControllerType {
  Touch_Adb = 1,
  Touch_MiniTouch = 2,
  Touch_MaaTouch = 3,
  Touch_Mask = 0xff,

  Key_Adb = 1 << 8,
  Key_MaaTouch = 2 << 8,
  Key_Mask = 0xff00,

  Input_Preset_Adb = Touch_Adb | Key_Adb,
  Input_Preset_Minitouch = Touch_MiniTouch | Key_Adb,
  Input_Preset_Maatouch = Touch_MaaTouch | Key_MaaTouch,

  Screencap_FastestWay = 1 << 16,
  Screencap_RawByNetcat = 2 << 16,
  Screencap_RawWithGzip = 3 << 16,
  Screencap_Encode = 4 << 16,
  Screencap_EncodeToFile = 5 << 16,
  Screencap_MinicapDirect = 6 << 16,
  Screencap_MinicapStream = 7 << 16,
  Screencap_Mask = 0xff0000
}
