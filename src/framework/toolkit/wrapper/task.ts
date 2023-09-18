import { MaaToolKitLoader, MaaToolKitTaskHandle } from '..'
import { MaaStatus } from '../..'

export class MaaTask {
  loader: MaaToolKitLoader
  handle: MaaToolKitTaskHandle

  constructor(l: MaaToolKitLoader, h: MaaToolKitTaskHandle) {
    this.loader = l
    this.handle = h
  }

  get name() {
    return this.loader.func.MaaToolKitTaskName(this.handle) as string
  }

  get description() {
    return this.loader.func.MaaToolKitGetTaskDescription(this.handle) as string
  }

  set description(desc: string) {
    this.setDescription(desc)
  }

  setDescription(desc: string) {
    return !!this.loader.func.MaaToolKitSetTaskDescription(this.handle, desc)
  }

  get entry() {
    return this.loader.func.MaaToolKitGetTaskEntry(this.handle) as string
  }

  set entry(e: string) {
    this.setEntry(e)
  }

  setEntry(e: string) {
    return !!this.loader.func.MaaToolKitSetTaskEntry(this.handle, e)
  }

  get param() {
    return JSON.parse(this.loader.func.MaaToolKitGetTaskParam(this.handle) as string)
  }

  set param(p: string | Record<string, unknown>) {
    this.setParam(p)
  }

  setParam(p: string | Record<string, unknown>) {
    return !!this.loader.func.MaaToolKitSetTaskParam(
      this.handle,
      typeof p === 'string' ? p : JSON.stringify(p)
    )
  }

  get enabled() {
    return !!this.loader.func.MaaToolKitGetTaskEnabled(this.handle)
  }

  set enabled(e: boolean) {
    this.setEnabled(e)
  }

  setEnabled(e: boolean) {
    return !!this.loader.func.MaaToolKitSetTaskEnabled(this.handle, e)
  }

  get(key: string) {
    return this.loader.func.MaaToolKitGetTaskCustomInfo(this.handle, key) as string | null
  }

  set(key: string, val: string) {
    return !!this.loader.func.MaaToolKitSetTaskCustomInfo(this.handle, key, val)
  }

  get status() {
    return this.loader.func.MaaToolKitTaskStatus(this.handle) as MaaStatus
  }
}
