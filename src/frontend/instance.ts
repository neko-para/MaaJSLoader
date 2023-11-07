import * as maarpc from '../gen'
import { PbToObject } from '../helper'
import { context, contextInput } from './context'
import { Controller } from './controller'
import { Resource } from './resource'
import type {
  ControllerHandle,
  ImageHandle,
  InstanceActionId,
  InstanceHandle,
  Rect,
  ResourceHandle,
  SyncCtxHandle
} from './types'
import {
  acquire_id,
  register_callback_for,
  toJsRect,
  toPbRect,
  unregister_callback,
  update_callback_for
} from './utility'

export type AnalyzeOutput = {
  match: boolean
  box: Rect
  detail: string
}

export class CustomRecognizerBase {
  async process(
    req: PbToObject<maarpc.CustomRecognizerResponse>,
    res: PbToObject<maarpc.CustomRecognizerRequest>
  ) {
    switch (true) {
      case 'analyze' in req: {
        const out: AnalyzeOutput = {
          match: false,
          box: { x: 0, y: 0, width: 0, height: 0 },
          detail: ''
        }
        const ret = await this.analyze(
          req.analyze!.context! as SyncCtxHandle,
          req.analyze!.image_handle! as ImageHandle,
          req.analyze!.task!,
          req.analyze!.param!,
          out
        )

        res.analyze = {
          match: out.match,
          box: toPbRect(out.box),
          detail: out.detail
        }
        return ret
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

export class CustomActionBase {
  process(
    req: PbToObject<maarpc.CustomActionResponse>,
    res: PbToObject<maarpc.CustomActionRequest>
  ) {
    switch (true) {
      case 'run' in req: {
        return this.run(
          req.run!.context! as SyncCtxHandle,
          req.run!.task!,
          req.run!.param!,
          toJsRect(req.run!.box!),
          req.run!.detail!
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

export class Instance {
  rpcId!: string
  cbId!: string
  handle!: InstanceHandle
  onCallback: (msg: string, detail: string) => Promise<void> = async (...args) => {
    console.log(...args)
  }

  static async init_from(from: InstanceHandle, id: string, rid: string) {
    const inst = new Instance()
    inst.rpcId = rid
    inst.cbId = id
    inst.handle = from
    await update_callback_for(rid, inst)
    return inst
  }

  static init() {
    return new Instance().create()
  }

  async create() {
    this.cbId = await acquire_id()
    this.rpcId = await register_callback_for(this.cbId, this)
    this.handle = (await context['instance.create']({ id: this.cbId }))!.handle! as InstanceHandle
    return this
  }

  async destroy() {
    await context['instance.destroy']({ handle: this.handle })
    await unregister_callback(this.cbId)
  }

  async register_custom_recognizer(name: string, reco: CustomRecognizerBase) {
    let initRes: (() => void) | null = null
    const rpcRecoId = await context['instance.register_custom_recognizer'](async res => {
      if (res) {
        if (initRes) {
          initRes()
          initRes = null
        } else {
          const req: PbToObject<maarpc.CustomRecognizerRequest> = {}
          req.ok = await reco.process(res, req)
          contextInput[rpcRecoId]?.(req)
        }
      }
    })
    const initReq: PbToObject<maarpc.CustomRecognizerRequest> = {
      ok: true,
      init: {
        handle: this.handle,
        name
      }
    }
    await contextInput[rpcRecoId]?.(initReq)
    await new Promise<void>(res => {
      initRes = res
    })
    return rpcRecoId
  }

  async unregister_custom_recognizer(name: string) {
    await context['instance.unregister_custom_recognizer']({ handle: this.handle, str: name })
  }

  async clear_custom_recognizer() {
    await context['instance.clear_custom_recognizer']({ handle: this.handle })
  }

  async register_custom_action(name: string, act: CustomActionBase) {
    let initRes: (() => void) | null = null
    const rpcActId = await context['instance.register_custom_action'](async res => {
      if (res) {
        if (initRes) {
          initRes()
          initRes = null
        } else {
          const req: PbToObject<maarpc.CustomActionRequest> = {}
          req.ok = await act.process(res, req)
          contextInput[rpcActId]?.(req)
        }
      }
    })
    const initReq: PbToObject<maarpc.CustomActionRequest> = {
      ok: true,
      init: {
        handle: this.handle,
        name
      }
    }
    await contextInput[rpcActId]?.(initReq)
    await new Promise<void>(res => {
      initRes = res
    })
    return rpcActId
  }

  async unregister_custom_action(name: string) {
    await context['instance.unregister_custom_action']({ handle: this.handle, str: name })
  }

  async clear_custom_action() {
    await context['instance.clear_custom_action']({ handle: this.handle })
  }

  private wrap(_id: Promise<{ id?: number } | null>) {
    const id = _id as Promise<{
      id: InstanceActionId
    }>
    return {
      instance: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return (await context['instance.status']({ handle: this.instance.handle, id: i.id }))!
            .status!
        })()
      },
      async wait() {
        return (await context['instance.wait']({
          handle: this.instance.handle,
          id: (await id).id
        }))!.status!
      }
    }
  }

  async bind_resource(resource: Resource) {
    await context['instance.bind_resource']({
      handle: this.handle,
      another_handle: resource.handle
    })
  }

  async bind_controller(controller: Controller) {
    await context['instance.bind_controller']({
      handle: this.handle,
      another_handle: controller.handle
    })
  }

  get inited() {
    return (async () => (await context['instance.inited']({ handle: this.handle }))!.bool!)()
  }

  post_task(task: string, param: string | Record<string, unknown>) {
    if (typeof param === 'object') {
      param = JSON.stringify(param)
    }
    return Object.assign(
      this.wrap(context['instance.post_task']({ handle: this.handle, task, param })),
      {
        async set_param(
          this: ReturnType<InstanceType<typeof Instance>['wrap']>,
          param: string | Record<string, unknown>
        ) {
          if (typeof param === 'object') {
            param = JSON.stringify(param)
          }
          await context['instance.set_task_param']({
            handle: this.instance.handle,
            id: (await this.id).id,
            param
          })
        }
      }
    )
  }

  get all_finished() {
    return (async () => (await context['instance.all_finished']({ handle: this.handle }))!.bool!)()
  }

  async stop() {
    await context['instance.stop']({ handle: this.handle })
  }

  get resource() {
    return (async () =>
      (await context['instance.resource']({ handle: this.handle }))!.handle! as ResourceHandle)()
  }

  get controller() {
    return (async () =>
      (await context['instance.controller']({ handle: this.handle }))!
        .handle! as ControllerHandle)()
  }
}
