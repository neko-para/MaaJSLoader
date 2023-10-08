import { Controller, Resource, context } from '.'
import { InstanceActionId, InstanceHandle } from '../base'
import { Callback } from './types'

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
    this.cbId = await context.utility.acquire_id()
    context.utility.register_callback(this.cbId, cb)
    this.handle = await context.instance.create(this.cbId)
    return this
  }

  async destroy() {
    await context.instance.destroy(this.handle)
    await context.utility.unregister_callback(this.cbId)
  }

  private wrap(id: Promise<InstanceActionId>) {
    return {
      instance: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context.instance.status(this.instance.handle, i)
        })()
      },
      async wait() {
        return await context.instance.wait(this.instance.handle, await id)
      }
    }
  }

  async bind_resource(resource: Resource) {
    await context.instance.bind_resource(this.handle, resource.handle)
  }

  async bind_controller(controller: Controller) {
    await context.instance.bind_controller(this.handle, controller.handle)
  }

  get inited() {
    return context.instance.inited(this.handle)
  }

  post_task(task: string, param: string | Record<string, unknown>) {
    return Object.assign(this.wrap(context.instance.post_task(this.handle, task, param)), {
      async set_param(
        this: ReturnType<InstanceType<typeof Instance>['wrap']>,
        param: string | Record<string, unknown>
      ) {
        await context.instance.set_task_param(this.instance.handle, await this.id, param)
      }
    })
  }

  get all_finished() {
    return context.instance.all_finished(this.handle)
  }

  async stop() {
    await context.instance.stop(this.handle)
  }

  get resource() {
    return (async () => {
      return Resource.init_from(await context.instance.resource(this.handle))
    })()
  }

  get controller() {
    return (async () => {
      return Controller.init_from(await context.instance.controller(this.handle))
    })()
  }
}
