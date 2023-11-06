import * as maarpc from '../gen/types'
import { PbToObject } from '../helper'
import { context, contextOutput } from './context'
import type { Callback, LoggingLevel, Rect } from './types'

export async function version() {
  return (await context['utility.version']({}))!.str!
}

export async function set_log_dir(log_dir: string) {
  await context['utility.set_global_option']({ log_dir })
}

export async function set_save_draw(save_draw: boolean) {
  await context['utility.set_global_option']({ save_draw })
}

export async function set_recording(recording: boolean) {
  await context['utility.set_global_option']({ recording })
}

export async function set_stdout_level(stdout_level: LoggingLevel) {
  await context['utility.set_global_option']({ stdout_level })
}

export async function set_show_draw(show_draw: boolean) {
  await context['utility.set_global_option']({ show_draw })
}

export async function acquire_id() {
  return (await context['utility.acquire_id']({}))!.id!
}

export async function register_callback(id: string, cb: Callback) {
  const rid = await context['utility.register_callback']({ id }, d => {
    if (d) {
      cb(d.msg!, d.detail!)
    }
  })
  return rid
}

export async function register_callback_for(id: string, target: { onCallback: Callback }) {
  return await register_callback(id, (msg, detail) => target.onCallback(msg, detail))
}

export async function update_callback(rid: string, cb: Callback) {
  contextOutput[rid] = (d: PbToObject<maarpc.Callback>) => {
    if (d) {
      cb(d.msg!, d.detail!)
    }
  }
}

export async function update_callback_for(rid: string, target: { onCallback: Callback }) {
  await update_callback(rid, (msg, detail) => target.onCallback(msg, detail))
}

export async function unregister_callback(id: string) {
  await context['utility.unregister_callback']({ id })
}

export function toJsRect(r: PbToObject<maarpc.Rect>): Rect {
  return {
    x: r.xy!.x!,
    y: r.xy!.y!,
    width: r.wh!.width!,
    height: r.wh!.height!
  }
}

export function toPbRect(r: Rect): PbToObject<maarpc.Rect> {
  return {
    xy: {
      x: r.x,
      y: r.y
    },
    wh: {
      width: r.width,
      height: r.height
    }
  }
}
