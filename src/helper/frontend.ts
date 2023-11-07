import { v4 } from 'uuid'

import { type PbBuffer, markBuffer } from './buffer'
import type { InvokeClient, PostServer, ServiceDefinition, TranslateAllService } from './types'

export class Frontend {
  adapter: InvokeClient & PostServer
  streaming: Record<string, [(data: PbBuffer) => Promise<void>, () => void]>
  input: Record<string, (arg: any) => any>
  output: Partial<Record<string, (arg: any) => Promise<void>>>
  client: Partial<Record<string, (...args: any) => void>>

  static make_id() {
    return v4()
  }

  constructor(adapter: InvokeClient & PostServer) {
    this.adapter = adapter
    this.streaming = {}
    this.input = {}
    this.output = {}
    this.client = {}
  }

  init() {
    this.adapter.on('$stream', async (arg, id) => {
      if (id! in this.streaming) {
        await this.streaming[id!][0](arg)
      }
    })
    this.adapter.on('$close', async (arg, id) => {
      if (id! in this.streaming) {
        this.streaming[id!][1]()
        delete this.streaming[id!]
      }
    })
  }

  cast_client<Definition>() {
    return this.client as TranslateAllService<Definition>
  }

  add_all(definitions: Record<string, ServiceDefinition>) {
    for (const key of Object.keys(definitions)) {
      this.add(key, definitions[key])
    }
  }

  add(name: string, definition: ServiceDefinition) {
    for (const method in definition) {
      const key = `${name}.${method}`
      const defs = definition[method]
      if (!defs.requestStream) {
        if (!defs.responseStream) {
          this.client[key] = async arg => {
            const result = await this.adapter.invoke(
              key,
              markBuffer(defs.request.fromObject(arg).serialize(), defs.requestType)
            )
            return result ? defs.response.deserialize(result.__msg__).toObject() : null
          }
        } else {
          this.client[key] = async (arg, out) => {
            const id = Frontend.make_id()
            this.output[id] = out
            this.streaming[id] = [
              async data => {
                this.output[id]?.(defs.response.deserialize(data.__msg__).toObject())
              },
              () => {
                this.output[id]?.(null)
                delete this.output[id]
              }
            ]
            await this.adapter.invoke(
              key,
              markBuffer(defs.request.fromObject(arg).serialize(), defs.requestType),
              id
            )
            return id
          }
        }
      } else {
        if (!defs.responseStream) {
          this.client[key] = async out => {
            const id = Frontend.make_id()
            this.output[id] = out
            this.adapter.invoke(key, markBuffer(new Uint8Array(), ''), id).then(result => {
              if (result) {
                this.output[id]?.(defs.response.deserialize(result.__msg__).toObject())
              } else {
                this.output[id]?.(null)
                delete this.input[id]
                delete this.output[id]
              }
            })
            this.input[id] = async (msg: any) => {
              if (msg === null) {
                await this.adapter.invoke('$close', markBuffer(new Uint8Array(), ''), id)
              } else {
                await this.adapter.invoke(
                  '$stream',
                  markBuffer(defs.request.fromObject(msg).serialize(), defs.requestType),
                  id
                )
              }
            }
            return id
          }
        } else {
          this.client[key] = async out => {
            const id = Frontend.make_id()
            this.output[id] = out
            this.streaming[id] = [
              async data => {
                this.output[id]?.(defs.response.deserialize(data.__msg__).toObject())
              },
              () => {
                this.output[id]?.(null)
                delete this.input[id]
                delete this.output[id]
              }
            ]
            await this.adapter.invoke(key, markBuffer(new Uint8Array(), ''), id)
            this.input[id] = async (msg: any) => {
              if (msg === null) {
                await this.adapter.invoke('$close', markBuffer(new Uint8Array(), ''), id)
              } else {
                await this.adapter.invoke(
                  '$stream',
                  markBuffer(defs.request.fromObject(msg).serialize(), defs.requestType),
                  id
                )
              }
            }
            return id
          }
        }
      }
    }
  }
}
