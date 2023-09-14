import koffi from 'koffi'

import { MaaStringBuffer } from '.'
import { MaaAPICallback, MaaFrameworkLoader, MaaResourceCallback, MaaResourceHandle } from '..'
import { MaaMsg } from '../msg'
import { Dispatcher, DispatcherStatus } from './dispatcher'

export class MaaResource {
  loader: MaaFrameworkLoader
  dispatcher: Dispatcher
  callback: koffi.IKoffiRegisteredCallback
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
    return new Promise<boolean>(resolve => {
      this.loader.func.MaaResourceDestroy.async(this.handle, (err: any, res: void) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  load(path: string) {
    return this.dispatcher.post(this.loader.func.MaaResourcePostPath(this.handle, path)).promise
  }

  hash() {
    const sb = new MaaStringBuffer(this.loader)
    if (!this.loader.func.MaaResourceGetHash(this.handle, sb.handle)) {
      sb.destroy()
      return ''
    }
    const str = sb.get()
    sb.destroy()
    return str
  }
}
