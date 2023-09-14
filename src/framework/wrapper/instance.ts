import koffi from 'koffi'

import { MaaController, MaaResource } from '.'
import {
  MaaAPICallback,
  MaaFrameworkLoader,
  MaaInstanceCallback,
  MaaInstanceHandle,
  MaaStatus
} from '..'
import { MaaMsg } from '../msg'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export class MaaInstance {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: koffi.IKoffiRegisteredCallback
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
    return new Promise<boolean>(resolve => {
      this.loader.func.MaaDestroy.async(this.handle, (err: any, res: void) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  bindResource(res: MaaResource) {
    return !!this.loader.func.MaaBindResource(this.handle, res.handle)
  }

  bindController(ctrl: MaaController) {
    return !!this.loader.func.MaaBindController(this.handle, ctrl.handle)
  }

  get inited() {
    return !!this.loader.func.MaaInited(this.handle)
  }

  post(task: string, param?: unknown, onstatus?: (status: DispatcherStatus) => void) {
    const id = this.loader.func.MaaPostTask(this.handle, task, JSON.stringify(param))
    const info = this.dispatcher.post(id, onstatus)
    return {
      ...info,
      config: (param: unknown) => {
        return !!this.loader.func.MaaSetTaskParam(this.handle, id, JSON.stringify(param))
      },
      status: () => {
        return this.loader.func.MaaTaskStatus(this.handle, id) as MaaStatus
      },
      wait: () => {
        return new Promise<MaaStatus>(resolve => {
          this.loader.func.MaaWaitTask.async(this.handle, id, (_err: unknown, res: MaaStatus) => {
            resolve(res)
          })
        })
      }
    }
  }

  allFinished() {
    return !!this.loader.func.MaaTaskAllFinished(this.handle)
  }

  stop() {
    return new Promise<boolean>(resolve => {
      this.loader.func.MaaStop.async(this.handle, (_err: unknown, res: boolean) => {
        resolve(res)
      })
    })
  }
}
