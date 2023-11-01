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
