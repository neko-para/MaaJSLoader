import koffi from 'koffi'

export const AsstExtAPI = koffi.opaque('AsstExtAPI')
export const AsstHandle = koffi.alias('AsstHandle', 'AsstExtAPI*')
export type AsstHandle = unknown

export const AsstBool = koffi.alias('AsstBool', 'uint8')
export const AsstSize = koffi.alias('AsstSize', 'uint64')

export const AsstId = koffi.alias('AsstId', 'int32')
export const AsstMsgId = koffi.alias('AsstMsgId', 'AsstId')
export const AsstTaskId = koffi.alias('AsstTaskId', 'AsstId')
export const AsstAsyncCallId = koffi.alias('AsstAsyncCallId', 'AsstId')

export const AsstOptionKey = koffi.alias('AsstOptionKey', 'int32')
export const AsstStaticOptionKey = koffi.alias('AsstStaticOptionKey', 'AsstOptionKey')
export const AsstInstanceOptionKey = koffi.alias('AsstInstanceOptionKey', 'AsstOptionKey')

export const AsstApiCallback_Prototype = koffi.proto(
  'void AsstApiCallback_Prototype(AsstMsgId msg, str details_json, intptr custom_arg)'
)

export const AsstApiCallback = koffi.alias(
  'AsstApiCallback',
  koffi.pointer(AsstApiCallback_Prototype)
)
export type AsstApiCallback = (msg: AsstMsg, details_json: string, custom_arg: unknown) => void

export const enum AsstInstanceOptionKeyEnum {
  Invalid = 0,
  TouchMode = 2,
  DeploymentWithPause = 3,
  AdbLiteEnabled = 4,
  KillAdbOnExit = 5
}

export const enum AsstMsg {
  /* Global Info */
  InternalError = 0, // 内部错误
  InitFailed = 1, // 初始化失败
  ConnectionInfo = 2, // 连接相关信息
  AllTasksCompleted = 3, // 全部任务完成
  AsyncCallInfo = 4, // 外部异步调用信息

  /* TaskChain Info */
  TaskChainError = 10000, // 任务链执行/识别错误
  TaskChainStart = 10001, // 任务链开始
  TaskChainCompleted = 10002, // 任务链完成
  TaskChainExtraInfo = 10003, // 任务链额外信息
  TaskChainStopped = 10004, // 任务链手动停止

  /* SubTask Info */
  SubTaskError = 20000, // 原子任务执行/识别错误
  SubTaskStart = 20001, // 原子任务开始
  SubTaskCompleted = 20002, // 原子任务完成
  SubTaskExtraInfo = 20003, // 原子任务额外信息
  SubTaskStopped = 20004 // 原子任务手动停止
}
