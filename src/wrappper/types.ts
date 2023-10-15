export type Callback = (msg: string, details: string) => void
export const enum Status {
  Pending = 1000,
  Running = 2000,
  Success = 3000,
  Failed = 4000
}
