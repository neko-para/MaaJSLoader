import * as maarpc from '../gen'

export type Rect = { x: number; y: number; width: number; height: number }

export function toPbRect(rect: Rect) {
  return maarpc.Rect.fromObject({
    xy: {
      x: rect.x,
      y: rect.y
    },
    wh: {
      width: rect.width,
      height: rect.height
    }
  })
}

export function toJsRect(rect: maarpc.Rect): Rect {
  return {
    x: rect.xy.x,
    y: rect.xy.y,
    width: rect.wh.width,
    height: rect.wh.height
  }
}
