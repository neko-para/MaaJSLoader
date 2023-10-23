import { context } from '.'
import { ResourceActionId, ResourceHandle } from '../base'
import { Callback } from './types'

export class Resource {
  cbId!: string
  handle!: ResourceHandle
  onCallback: (msg: string, detail: string) => void = () => {}

  static async init_from(from: ResourceHandle, cb: string) {
    const res = new Resource()
    res.cbId = cb
    res.handle = from
    await context['utility.register_callback'](cb, (msg, detail) => {
      res.onCallback(msg, detail)
    })
    return res
  }

  static init() {
    return new Resource().create()
  }

  async create() {
    this.cbId = await context['utility.acquire_id']()
    await context['utility.register_callback'](this.cbId, (msg, detail) => {
      this.onCallback(msg, detail)
    })
    this.handle = await context['resource.create'](this.cbId)
    return this
  }

  async destroy() {
    await context['resource.destroy'](this.handle)
    await context['utility.unregister_callback'](this.cbId)
  }

  private wrap(id: Promise<ResourceActionId>) {
    return {
      resource: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context['resource.status'](this.resource.handle, i)
        })()
      },
      async wait() {
        return await context['resource.wait'](this.resource.handle, await id)
      }
    }
  }

  post_path(path: string) {
    return this.wrap(context['resource.post_path'](this.handle, path))
  }

  get loaded() {
    return context['resource.loaded'](this.handle)
  }

  get hash() {
    return context['resource.hash'](this.handle)
  }
}
