import * as maarpc from '../gen'
import { ImageHandle } from './buffer'
import { ControllerHandle } from './controller'
import { ResourceHandle } from './resource'
import { SyncCtxHandle } from './syncctx'
import { Rect, toJsRect, toPbRect } from './utils'

export type InstanceHandle = string & { __brand: 'InstanceHandle' }
export type InstanceActionId = number & { __brand: 'InstanceActionId' }

export type AnalyzeOutput = {
  match: boolean
  box: { x: number; y: number; width: number; height: number }
  detail: string
}

export interface CustomRecognizerImpl {
  analyze(
    ctx: SyncCtxHandle,
    image: ImageHandle,
    task: string,
    param: string,
    out: AnalyzeOutput
  ): boolean | Promise<boolean>
}

export class CustomRecognizerBase implements CustomRecognizerImpl {
  process(req: maarpc.CustomRecognizerResponse, res: maarpc.CustomRecognizerRequest) {
    switch (req.command) {
      case 'analyze': {
        const out: AnalyzeOutput = {
          match: false,
          box: { x: 0, y: 0, width: 0, height: 0 },
          detail: ''
        }
        const ret = this.analyze(
          req.analyze.context as SyncCtxHandle,
          req.analyze.image_handle as ImageHandle,
          req.analyze.task,
          req.analyze.param,
          out
        )
        if (typeof ret === 'boolean') {
          res.analyze = new maarpc.CustomRecognizerAnalyzeResult({
            match: out.match,
            box: toPbRect(out.box),
            detail: out.detail
          })
          return ret
        } else {
          return ret.then(v => {
            res.analyze = new maarpc.CustomRecognizerAnalyzeResult({
              match: out.match,
              box: toPbRect(out.box),
              detail: out.detail
            })
            return v
          })
        }
      }
      default:
        return false
    }
  }

  analyze(
    ctx: SyncCtxHandle,
    image: ImageHandle,
    task: string,
    param: string,
    out: AnalyzeOutput
  ): boolean | Promise<boolean> {
    return false
  }
}

export interface CustomActionImpl {
  run(
    ctx: SyncCtxHandle,
    task: string,
    param: string,
    box: Rect,
    detail: string
  ): boolean | Promise<boolean>
}

export class CustomActionBase implements CustomActionImpl {
  process(req: maarpc.CustomActionResponse, res: maarpc.CustomActionRequest) {
    switch (req.command) {
      case 'run': {
        return this.run(
          req.run.context as SyncCtxHandle,
          req.run.task,
          req.run.param,
          toJsRect(req.run.box),
          req.run.detail
        )
      }
      default:
        return false
    }
  }

  run(
    ctx: SyncCtxHandle,
    task: string,
    param: string,
    box: Rect,
    detail: string
  ): boolean | Promise<boolean> {
    return false
  }
}

export class InstanceClient {
  _client: maarpc.InstanceClient

  constructor(c: maarpc.InstanceClient) {
    this._client = c
  }

  async create(id: string) {
    return (await this._client.create(new maarpc.IdRequest({ id }))).handle as InstanceHandle
  }

  async destroy(handle: InstanceHandle) {
    await this._client.destroy(new maarpc.HandleRequest({ handle }))
  }

  async register_custom_recognizer(
    handle: InstanceHandle,
    name: string,
    reco: InstanceType<typeof CustomRecognizerBase>['process']
  ) {
    const stream = this._client.register_custom_recognizer()
    await new Promise(resolve => {
      stream.write(
        new maarpc.CustomRecognizerRequest({
          init: new maarpc.CustomRecognizerInit({ handle, name })
        }),
        resolve
      )
    })
    stream.on('readable', async () => {
      const res = stream.read()
      if (!res) {
        return
      }
      if (!res.has_analyze) {
        return
      }
      const req = new maarpc.CustomRecognizerRequest()
      req.ok = await reco(res, req)
      stream.write(req)
    })
    return stream
  }

  async unregister_custom_recognizer(handle: InstanceHandle, name: string) {
    await this._client.unregister_custom_recognizer(
      new maarpc.HandleStringRequest({ handle, str: name })
    )
  }

  async clear_custom_recognizer(handle: InstanceHandle) {
    await this._client.clear_custom_recognizer(new maarpc.HandleRequest({ handle }))
  }

  async register_custom_action(
    handle: InstanceHandle,
    name: string,
    act: InstanceType<typeof CustomActionBase>['process']
  ) {
    const stream = this._client.register_custom_action()
    await new Promise(resolve => {
      stream.write(
        new maarpc.CustomActionRequest({
          init: new maarpc.CustomActionInit({ handle, name })
        }),
        resolve
      )
    })
    stream.on('readable', async () => {
      const res = stream.read()
      if (!res) {
        return
      }
      if (!res.has_run && !res.has_stop) {
        return
      }
      const req = new maarpc.CustomActionRequest()
      req.ok = await act(res, req)
      stream.write(req)
    })
    return stream
  }

  async unregister_custom_action(handle: InstanceHandle, name: string) {
    await this._client.unregister_custom_action(
      new maarpc.HandleStringRequest({ handle, str: name })
    )
  }

  async clear_custom_action(handle: InstanceHandle) {
    await this._client.clear_custom_action(new maarpc.HandleRequest({ handle }))
  }

  async bind_resource(handle: InstanceHandle, res_handle: ResourceHandle) {
    await this._client.bind_resource(
      new maarpc.HandleHandleRequest({ handle, another_handle: res_handle })
    )
  }

  async bind_controller(handle: InstanceHandle, ctrl_handle: ControllerHandle) {
    await this._client.bind_controller(
      new maarpc.HandleHandleRequest({ handle, another_handle: ctrl_handle })
    )
  }

  async inited(handle: InstanceHandle) {
    return (await this._client.inited(new maarpc.HandleRequest({ handle }))).bool
  }

  async post_task(handle: InstanceHandle, task: string, param: string | Record<string, unknown>) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    return (
      await this._client.post_task(new maarpc.InstancePostTaskRequest({ handle, task, param }))
    ).id as InstanceActionId
  }

  async set_task_param(
    handle: InstanceHandle,
    id: InstanceActionId,
    param: string | Record<string, unknown>
  ) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    await this._client.set_task_param(new maarpc.InstanceSetTaskParamRequest({ handle, id, param }))
  }

  async status(handle: InstanceHandle, id: InstanceActionId) {
    return (await this._client.status(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async wait(handle: InstanceHandle, id: InstanceActionId) {
    return (await this._client.wait(new maarpc.HandleIIdRequest({ handle, id }))).status
  }

  async all_finished(handle: InstanceHandle) {
    return (await this._client.all_finished(new maarpc.HandleRequest({ handle }))).bool
  }

  async stop(handle: InstanceHandle) {
    await this._client.stop(new maarpc.HandleRequest({ handle }))
  }

  async resource(handle: InstanceHandle) {
    return (await this._client.resource(new maarpc.HandleRequest({ handle })))
      .handle as ResourceHandle
  }

  async controller(handle: InstanceHandle) {
    return (await this._client.controller(new maarpc.HandleRequest({ handle })))
      .handle as ControllerHandle
  }
}
