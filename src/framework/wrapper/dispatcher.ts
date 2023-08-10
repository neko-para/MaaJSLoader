import { MaaAPICallback } from '../types'

type PromiseInfo<T> = {
  resolve: (state: T) => void
  promise: Promise<T>
}
function getPromise<T>(): PromiseInfo<T> {
  const result: Partial<PromiseInfo<T>> = {}
  result.promise = new Promise<T>(resolve => {
    result.resolve = resolve
  })
  return result as PromiseInfo<T>
}

export const enum DispatcherStatus {
  Invalid,
  Pending,
  Started,
  Completed,
  Failed,
  Stopped
}

export class Dispatcher {
  callback: MaaAPICallback
  task: Record<
    string,
    {
      status: DispatcherStatus
      onstatus?: (status: DispatcherStatus) => void
    } & PromiseInfo<boolean>
  >
  passlog = false

  constructor(state: Record<string, DispatcherStatus>, rest?: MaaAPICallback) {
    this.callback = (msg: string, detail: string) => {
      const st = state[msg] ?? DispatcherStatus.Invalid
      if (st === DispatcherStatus.Invalid) {
        rest?.(msg, detail)
      } else {
        if (this.passlog) {
          rest?.(msg, detail)
        }
        const obj = JSON.parse(detail) as {
          id: bigint
        }
        this.trigger(obj.id, st)
      }
    }
    this.task = {}
  }

  post(
    id: bigint,
    onstatus?: (status: DispatcherStatus) => void
  ): {
    status: DispatcherStatus
    promise: Promise<boolean>
  } {
    const key = `${id}`
    if (key in this.task) {
      return this.task[key]
    } else {
      const res = {
        status: DispatcherStatus.Pending,
        onstatus,
        ...getPromise<boolean>()
      }
      this.task[`${id}`] = res
      return res
    }
  }

  trigger(id: bigint, state: DispatcherStatus) {
    const key = `${id}`
    let info = this.task[key]
    if (!info) {
      info = {
        status: DispatcherStatus.Pending,
        ...getPromise<boolean>()
      }
      this.task[key] = info
    }
    switch (state) {
      case DispatcherStatus.Pending:
        // pending shall not directly mentioned
        break
      case DispatcherStatus.Started:
        info.status = DispatcherStatus.Started
        info.onstatus?.(info.status)
        break
      case DispatcherStatus.Completed:
        info.status = DispatcherStatus.Completed
        info.onstatus?.(info.status)
        info.resolve(true)
        delete this.task[key]
        break
      case DispatcherStatus.Failed:
        info.status = DispatcherStatus.Failed
        info.onstatus?.(info.status)
        info.resolve(false)
        delete this.task[key]
        break
      case DispatcherStatus.Stopped:
        info.status = DispatcherStatus.Stopped
        info.onstatus?.(info.status)
        info.resolve(false)
        delete this.task[key]
        break
    }
  }
}
