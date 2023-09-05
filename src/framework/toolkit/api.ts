import koffi from 'koffi'

import '../types'

const protos = {
  MaaToolKitInit: 'MaaBool MaaToolKitInit()',
  MaaToolKitUninit: 'MaaBool MaaToolKitUninit()'
}

export type MaaToolKitExports = Record<keyof typeof protos, koffi.KoffiFunction>

export function load(lib: koffi.IKoffiLib) {
  const result: Record<string, koffi.KoffiFunction> = {}
  for (const key in protos) {
    result[key] = lib.func(protos[key as keyof typeof protos])
  }
  return result as MaaToolKitExports
}
