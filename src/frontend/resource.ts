import { context } from './context'
import type { ResourceActionId, ResourceHandle } from './types'
import {
  acquire_id,
  register_callback_for,
  unregister_callback,
  update_callback_for
} from './utility'

export class Resource {
  rpcId!: string
  cbId!: string
  handle!: ResourceHandle
  onCallback: (msg: string, detail: string) => void = () => {}

  static async init_from(from: ResourceHandle, id: string, rid: string) {
    const res = new Resource()
    res.rpcId = rid
    res.cbId = id
    res.handle = from
    await update_callback_for(rid, res)
    return res
  }

  static init() {
    return new Resource().create()
  }

  async create() {
    this.cbId = await acquire_id()
    this.rpcId = await register_callback_for(this.cbId, this)
    this.handle = (await context['resource.create']({ id: this.cbId }))!.handle! as ResourceHandle
    return this
  }

  async destroy() {
    await context['resource.destroy']({ handle: this.handle })
    await unregister_callback(this.cbId)
  }

  private wrap(_id: Promise<{ id?: number } | null>) {
    const id = _id as Promise<{
      id: ResourceActionId
    }>
    return {
      resource: this,
      id,
      get status() {
        return (async () => {
          const i = await id
          return context['resource.status']({ handle: this.resource.handle, id: i.id })
        })()
      },
      async wait() {
        return await context['resource.wait']({ handle: this.resource.handle, id: (await id).id })
      }
    }
  }

  post_path(path: string) {
    return this.wrap(context['resource.post_path']({ handle: this.handle, str: path }))
  }

  get loaded() {
    return context['resource.loaded']({ handle: this.handle })
  }

  get hash() {
    return context['resource.hash']({ handle: this.handle })
  }
}
