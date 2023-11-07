import * as maarpc from '../gen/types'

export type PbBuffer = {
  __pb__: string
  __msg__: Uint8Array
}

export function markBuffer(buffer: Uint8Array, name: string): PbBuffer {
  return {
    __pb__: name,
    __msg__: buffer
  }
}

export function isPbBuffer(x: any): x is PbBuffer {
  return typeof x === 'object' && x !== null && '__pb__' in x && '__msg__' in x
}

export function inspectBuffer(x: any) {
  if (isPbBuffer(x)) {
    if (x.__pb__ in maarpc) {
      const obj = maarpc[x.__pb__ as keyof typeof maarpc].deserialize(x.__msg__).toObject() as {
        __pb__: string
      }
      return Object.assign(
        {
          __pb__: x.__pb__
        },
        obj
      )
    } else {
      return x
    }
  } else {
    return x
  }
}

export function inspectBuffers(...args: any[]) {
  return args.map(inspectBuffer)
}
