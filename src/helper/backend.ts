import type { InvokeServer, PostClient, ServiceDefinition } from './types'

export class Backend {
  adapter: InvokeServer & PostClient
  streaming: Record<string, [(data: Uint8Array) => Promise<void>, () => void]>

  constructor(adapter: InvokeServer & PostClient) {
    this.adapter = adapter
    this.streaming = {}
  }

  init() {
    this.adapter.handle('$stream', async (arg, id) => {
      if (id! in this.streaming) {
        await this.streaming[id!][0](arg)
      }
      return null
    })
    this.adapter.handle('$close', async (arg, id) => {
      if (id! in this.streaming) {
        this.streaming[id!][1]()
        delete this.streaming[id!]
      }
      return null
    })
  }

  add_all(
    services: Record<string, Record<string, Function>>,
    definitions: Record<string, ServiceDefinition>
  ) {
    for (const key of Object.keys(definitions)) {
      this.add(key, services[key], definitions[key])
    }
  }

  add(name: string, service: Record<string, Function>, definition: ServiceDefinition) {
    for (const method in definition) {
      const defs = definition[method]
      if (!defs.requestStream) {
        if (!defs.responseStream) {
          this.adapter.handle(`${name}.${method}`, async arg => {
            return (await service[method](defs.request.deserialize(arg))).serialize()
          })
        } else {
          this.adapter.handle(`${name}.${method}`, async (arg, id) => {
            const stream = service[method](defs.request.deserialize(arg))

            stream.on('readable', () => {
              const res = stream.read()
              if (!res) {
                return
              }
              this.adapter.post('$stream', res.serialize(), id)
            })
            stream.on('close', () => {
              this.adapter.post('$close', new Uint8Array(), id)
            })
            return null
          })
        }
      } else {
        if (!defs.responseStream) {
          this.adapter.handle(`${name}.${method}`, async (arg, id) => {
            return new Promise<Buffer | null>(resolve => {
              const stream = service[method]((err: any, val: any) => {
                if (err) {
                  console.log(err)
                  resolve(null)
                } else {
                  resolve(val.serialize())
                }
              })
              this.streaming[id!] = [
                data => {
                  return new Promise<void>(resolve => {
                    stream.write(defs.request.deserialize(data), resolve)
                  })
                },
                () => {
                  stream.close()
                }
              ]
              stream.on('close', () => {
                this.adapter.post('$close', new Uint8Array(), id)
              })
            })
          })
        } else {
          this.adapter.handle(`${name}.${method}`, async (arg, id) => {
            const stream = service[method]()
            this.streaming[id!] = [
              data => {
                return new Promise<void>(resolve => {
                  stream.write(defs.request.deserialize(data), resolve)
                })
              },
              () => {
                stream.close()
              }
            ]

            stream.on('readable', () => {
              const res = stream.read()
              if (!res) {
                return
              }
              this.adapter.post('$stream', res.serialize(), id)
            })
            stream.on('close', () => {
              this.adapter.post('$close', new Uint8Array(), id)
            })
            return null
          })
        }
      }
    }
  }
}
