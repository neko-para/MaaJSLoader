import { Controller, Image, Resource, context } from '.'
import {
  CustomActionBase,
  CustomActionImpl,
  ImageHandle,
  InstanceActionId,
  InstanceHandle,
  SyncCtxHandle
} from '../base'
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
*/
export class Instance {
  cbId!: string
  handle!: InstanceHandle
  onCallback: (msg: string, detail: string) => void = () => {}

  static async init_from(from: InstanceHandle, cb: string) {
    const inst = new Instance()
    inst.cbId = cb
    inst.handle = from
    await context['utility.register_callback'](cb, (msg, detail) => {
      inst.onCallback(msg, detail)
    })
    return inst
  }

  static init() {
    return new Instance().create()
  }

  async create() {
    this.cbId = await context['utility.acquire_id']()
    await context['utility.register_callback'](this.cbId, (msg, detail) => {
      this.onCallback(msg, detail)
    })
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

  async register_custom_action(name: string, act: CustomActionImpl) {
    await context['instance.register_custom_action'](this.handle, name, act)
  }

  async unregister_custom_action(name: string) {
    await context['instance.unregister_custom_action'](this.handle, name)
  }

  async clear_custom_action() {
    await context['instance.clear_custom_action'](this.handle)
  }

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
    return context['instance.resource'](this.handle)
  }

  get controller() {
    return context['instance.controller'](this.handle)
  }
}
