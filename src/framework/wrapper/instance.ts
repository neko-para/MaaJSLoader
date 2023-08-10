import koffi, { IKoffiRegisteredCallback } from 'koffi'

import { MaaController, MaaResource } from '.'
import { MaaFrameworkLoader } from '..'
import { MaaMsg } from '../msg'
import { MaaAPICallback, MaaInstanceCallback, MaaInstanceHandle } from '../types'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export class MaaInstance {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: IKoffiRegisteredCallback
  handle: MaaInstanceHandle

  constructor(l: MaaFrameworkLoader, cb?: MaaAPICallback) {
    this.loader = l
    this.dispatcher = new Dispatcher(
      {
        [MaaMsg.Task_Started]: DispatcherStatus.Started,
        [MaaMsg.Task_Completed]: DispatcherStatus.Completed,
        [MaaMsg.Task_Failed]: DispatcherStatus.Failed,
        [MaaMsg.Task_Stopped]: DispatcherStatus.Stopped
      },
      cb
    )
    this.callback = koffi.register(this.dispatcher.callback, MaaInstanceCallback)
    this.handle = this.loader.func.MaaCreate(this.callback, 0)
  }

  destroy() {
    this.loader.func.MaaDestroy(this.handle)
  }

  bindResource(res: MaaResource) {
    return !!this.loader.func.MaaBindResource(this.handle, res.handle)
  }

  bindController(ctrl: MaaController) {
    return !!this.loader.func.MaaBindController(this.handle, ctrl.handle)
  }

  inited() {
    return !!this.loader.func.MaaInited(this.handle)
  }

  post(task: string, param?: unknown, onstatus?: (status: DispatcherStatus) => void) {
    const id = this.loader.func.MaaPostTask(this.handle, task, JSON.stringify(param))
    const info = this.dispatcher.post(id, onstatus)
    return {
      ...info,
      config: (param: unknown) => {
        return !!this.loader.func.MaaSetTaskParam(this.handle, id, JSON.stringify(param))
      }
    }
  }

  allFinished() {
    return !!this.loader.func.MaaTaskAllFinished(this.handle)
  }

  stop() {
    return !!this.loader.func.MaaStop(this.handle)
  }
}
