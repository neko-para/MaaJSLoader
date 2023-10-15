import { Controller, Image, Resource, context } from '.'
import { ImageHandle, InstanceActionId, InstanceHandle, SyncCtxHandle } from '../base'
import { Rect, toJsRect, toPbRect } from '../base/utils'
import * as maarpc from '../gen'
import { Callback } from './types'

export type AnalyzeOutput = {
  match: boolean
  box: { x: number; y: number; width: number; height: number }
  detail: string
}
/*
export class CustomRecognizerBase {
  process(req: maarpc.CustomRecognizerResponse, res: maarpc.CustomRecognizerRequest) {
    switch (req.command) {
      case 'analyze': {
        const out: AnalyzeOutput = {
          match: false,
          box: { x: 0, y: 0, width: 0, height: 0 },
          detail: ''
        }
        const ret = this.analyze(
          SyncCtx.init_from(req.analyze.context as SyncCtxHandle),
          Image.init_from(req.analyze.image_handle as ImageHandle),
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
    ctx: SyncCtx,
    image: Image,
    task: string,
    param: string,
    out: AnalyzeOutput
  ): boolean | Promise<boolean> {
    return false
  }
}

export class CustomActionBase {
  process(req: maarpc.CustomActionResponse, res: maarpc.CustomActionRequest) {
    switch (req.command) {
      case 'run': {
        return this.run(
          SyncCtx.init_from(req.run.context as SyncCtxHandle),
          req.run.task,
          req.run.param,
          toJsRect(req.run.box),
          req.run.detail
        )
      }
      case 'stop':
        return this.stop()
      default:
        return false
    }
  }

  run(
    ctx: SyncCtx,
    task: string,
    param: string,
    box: Rect,
    detail: string
  ): boolean | Promise<boolean> {
    return false
  }

  stop(): boolean | Promise<boolean> {
    return false
  }
}
*/
export class Instance {
  cbId!: string
  handle!: InstanceHandle

  static init_from(from: InstanceHandle) {
    const inst = new Instance()
    inst.handle = from
    return inst
  }

  static init(cb: Callback) {
    return new Instance().create(cb)
  }

  async create(cb: Callback) {
    this.cbId = await context['utility.acquire_id']()
    context['utility.register_callback'](this.cbId, cb)
    this.handle = await context['instance.create'](this.cbId)
    return this
  }

  async destroy() {
    await context['instance.destroy'](this.handle)
    await context['utility.unregister_callback'](this.cbId)
  }

  // async register_custom_recognizer(name: string, reco: CustomRecognizerBase) {
  //   await context['instance.register_custom_recognizer'](this.handle, name, (req, res) => {
  //     return reco.process(req, res)
  //   })
  // }

  // async unregister_custom_recognizer(name: string) {
  //   await context['instance.unregister_custom_recognizer'](this.handle, name)
  // }

  // async clear_custom_recognizer() {
  //   await context['instance.clear_custom_recognizer'](this.handle)
  // }

  // async register_custom_action(name: string, reco: CustomActionBase) {
  //   await context['instance.register_custom_action'](this.handle, name, (req, res) => {
  //     return reco.process(req, res)
  //   })
  // }

  // async unregister_custom_action(name: string) {
  //   await context['instance.unregister_custom_action'](this.handle, name)
  // }

  // async clear_custom_action() {
  //   await context['instance.clear_custom_action'](this.handle)
  // }

  private wrap(id: Promise<InstanceActionId>) {
    return {
      instance: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context['instance.status'](this.instance.handle, i)
        })()
      },
      async wait() {
        return await context['instance.wait'](this.instance.handle, await id)
      }
    }
  }

  async bind_resource(resource: Resource) {
    await context['instance.bind_resource'](this.handle, resource.handle)
  }

  async bind_controller(controller: Controller) {
    await context['instance.bind_controller'](this.handle, controller.handle)
  }

  get inited() {
    return context['instance.inited'](this.handle)
  }

  post_task(task: string, param: string | Record<string, unknown>) {
    return Object.assign(this.wrap(context['instance.post_task'](this.handle, task, param)), {
      async set_param(
        this: ReturnType<InstanceType<typeof Instance>['wrap']>,
        param: string | Record<string, unknown>
      ) {
        await context['instance.set_task_param'](this.instance.handle, await this.id, param)
      }
    })
  }

  get all_finished() {
    return context['instance.all_finished'](this.handle)
  }

  async stop() {
    await context['instance.stop'](this.handle)
  }

  get resource() {
    return (async () => {
      return Resource.init_from(await context['instance.resource'](this.handle))
    })()
  }

  get controller() {
    return (async () => {
      return Controller.init_from(await context['instance.controller'](this.handle))
    })()
  }
}
