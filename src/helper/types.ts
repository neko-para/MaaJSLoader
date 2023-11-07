import type * as maarpc from '../gen/types'
import type { PbBuffer } from './buffer'

interface PbMessage {
  serialize(): Uint8Array
  toObject(): any
}

export type ServiceDefinition = {
  [name: string]: {
    path: string
    requestStream: boolean
    responseStream: boolean
    request: (abstract new () => any) & {
      deserialize: (buf: Uint8Array) => PbMessage
      fromObject: (obj: any) => PbMessage
    }
    requestType: keyof typeof maarpc
    response: (abstract new () => any) & {
      deserialize: (buf: Uint8Array) => PbMessage
      fromObject: (obj: any) => PbMessage
    }
    responseType: keyof typeof maarpc
  }
}

export type InvokeServer = {
  handle: (msg: string, func: (arg: PbBuffer, id?: string) => Promise<PbBuffer | null>) => void
}
export type InvokeClient = {
  invoke: (msg: string, arg: PbBuffer, id?: string) => Promise<PbBuffer | null>
}

export type PostServer = {
  on: (msg: string, func: (arg: PbBuffer, id?: string) => void) => void
}
export type PostClient = {
  post: (msg: string, arg: PbBuffer, id?: string) => void
}

export type PbToObject<Msg> = Msg extends {
  toObject: () => infer Obj
}
  ? Obj
  : never

export type GeneralDefinition<SS extends boolean, RS extends boolean, SMsg, RMsg> = {
  path: string
  requestStream: SS
  responseStream: RS
  request: abstract new () => SMsg
  response: abstract new () => RMsg
}

export type TranslateRpc<T> = T extends GeneralDefinition<
  infer SS,
  infer RS,
  infer SMsg,
  infer RMsg
>
  ? SS extends false
    ? RS extends false
      ? (req: PbToObject<SMsg>) => Promise<PbToObject<RMsg> | null>
      : (req: PbToObject<SMsg>, out: (res: PbToObject<RMsg> | null) => void) => Promise<string>
    : RS extends false
    ? (out: (res: PbToObject<RMsg> | null) => void) => Promise<string>
    : (out: (res: PbToObject<RMsg> | null) => void) => Promise<string>
  : never

export type TranslateAllRpc<T, N extends string> = {
  [K in keyof T as K extends string ? `${N}.${K}` : never]: TranslateRpc<T[K]>
}

export type __TranslateAllService<T, K extends keyof T = keyof T> = K extends string
  ? TranslateAllRpc<T[K], K>
  : never

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

export type TranslateAllService<T> = UnionToIntersection<__TranslateAllService<T>>
