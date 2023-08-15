import koffi, { IKoffiRegisteredCallback } from 'koffi'

import { MaaAPICallback, MaaFrameworkLoader, MaaResourceCallback, MaaResourceHandle } from '..'
import { MaaMsg } from '../msg'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export class MaaResource {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: IKoffiRegisteredCallback
  handle: MaaResourceHandle

  constructor(l: MaaFrameworkLoader, cb?: MaaAPICallback) {
    this.loader = l
    this.dispatcher = new Dispatcher(
      {
        [MaaMsg.Resource_StartLoading]: DispatcherStatus.Started,
        [MaaMsg.Resource_LoadingCompleted]: DispatcherStatus.Completed,
        [MaaMsg.Resource_LoadingError]: DispatcherStatus.Failed
      },
      cb
    )
    this.callback = koffi.register(this.dispatcher.callback, MaaResourceCallback)
    this.handle = this.loader.func.MaaResourceCreate(this.callback, 0)
  }

  destroy() {
    this.loader.func.MaaResourceDestroy(this.handle)
  }

  load(path: string) {
    return this.dispatcher.post(this.loader.func.MaaResourcePostResource(this.handle, path)).promise
  }
}
