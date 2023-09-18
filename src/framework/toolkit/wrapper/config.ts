import { MaaToolKitConfigHandle, MaaToolKitLoader, MaaToolKitTaskHandle } from '..'
import { MaaInstance, MaaStatus } from '../..'
import { MaaTask } from './task'

export class MaaConfig {
  loader: MaaToolKitLoader
  handle: MaaToolKitConfigHandle

  static size(l: MaaToolKitLoader) {
    return l.func.MaaToolKitConfigSize() as number
  }

  static get(l: MaaToolKitLoader, idx: number) {
    const handle = l.func.MaaToolKitGetConfig(idx)
    if (handle === null) {
      return null
    }
    return new MaaConfig(l, handle)
  }

  static current(l: MaaToolKitLoader) {
    const handle = l.func.MaaToolKitCurrentConfig()
    if (handle === null) {
      return null
    }
    return new MaaConfig(l, handle)
  }

  static add(l: MaaToolKitLoader, name: string) {
    const handle = l.func.MaaToolKitAddConfig(name, null)
    if (handle === null) {
      return null
    }
    return new MaaConfig(l, handle)
  }

  constructor(l: MaaToolKitLoader, h: MaaToolKitTaskHandle) {
    this.loader = l
    this.handle = h
  }

  bind(inst: MaaInstance) {
    return !!this.loader.func.MaaToolKitBindInstance(this.handle, inst.handle)
  }

  clone(name: string) {
    const handle = this.loader.func.MaaToolKitAddConfig(name, this.handle)
    if (handle === null) {
      return null
    }
    return new MaaConfig(this.loader, handle)
  }

  del() {
    return !!this.loader.func.MaaToolKitDelConfig(this.name)
  }

  setCurrent() {
    return !!this.loader.func.MaaToolKitSetCurrentConfig(this.name)
  }

  get name() {
    return this.loader.func.MaaToolKitConfigName(this.handle) as string
  }

  get description() {
    return this.loader.func.MaaToolKitGetConfigDescription(this.handle) as string
  }

  set description(desc: string) {
    this.setDescription(desc)
  }

  setDescription(desc: string) {
    return !!this.loader.func.MaaToolKitSetConfigDescription(this.handle, desc)
  }

  get(key: string) {
    return this.loader.func.MaaToolKitGetConfigCustomInfo(this.handle, key) as string | null
  }

  set(key: string, val: string) {
    return !!this.loader.func.MaaToolKitSetConfigCustomInfo(this.handle, key, val)
  }

  taskSize() {
    return this.loader.func.MaaToolKitTaskSize(this.handle) as number
  }

  task(index: number) {
    const handle = this.loader.func.MaaToolKitGetTask(this.handle, index)
    if (handle === null) {
      return null
    }
    return new MaaTask(this.loader, handle)
  }

  taskClone(name: string, task?: MaaTask) {
    const handle = this.loader.func.MaaToolKitAddTask(this.handle, name, task?.handle ?? null)
    if (handle === null) {
      return null
    }
    return new MaaTask(this.loader, handle)
  }

  taskDel(task: MaaTask) {
    return !!this.loader.func.MaaToolKitDelTask(this.handle, task.name)
  }

  taskMove(task: MaaTask, index: number) {
    return !!this.loader.func.MaaToolKitSetTaskIndex(this.handle, task.name, index)
  }

  postAll() {
    return !!this.loader.func.MaaToolKitPostAllTask(this.handle)
  }

  waitAll() {
    return new Promise<MaaStatus>(resolve => {
      this.loader.func.MaaToolKitWaitAllTask.async(this.handle, (_err: unknown, res: MaaStatus) => {
        resolve(res)
      })
    })
  }

  stopAll() {
    return new Promise<boolean>(resolve => {
      this.loader.func.MaaToolKitStopAllTask.async(this.handle, (_err: unknown, res: boolean) => {
        resolve(res)
      })
    })
  }
}
