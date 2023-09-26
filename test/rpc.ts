import * as grpc from '@grpc/grpc-js'
import path from 'path'

import * as maarpc from '../grpc'

async function main() {
  const utility = new maarpc.UtilityClient('0.0.0.0:8080', grpc.credentials.createInsecure())
  const resource = new maarpc.ResourceClient('0.0.0.0:8080', grpc.credentials.createInsecure())

  utility.set_global_option(
    new maarpc.SetGlobalOptionRequest({
      logging: path.join(process.cwd(), 'debug')
    })
  )

  console.log((await utility.version(new maarpc.EmptyRequest())).str)
  const id = (await utility.acquire_id(new maarpc.EmptyRequest())).id
  console.log('callback id', id)
  const stream = utility.register_callback(new maarpc.IdRequest({ id }))
  stream.on('readable', () => {
    const cb = stream.read() as unknown as maarpc.Callback
    if (cb) {
      console.log(cb.msg, cb.detail)
    } else {
      console.log(cb)
    }
  })
  const handle = (await resource.create(new maarpc.IdRequest({ id }))).handle
  console.log('resource handle', handle)
  const tid = (
    await resource.post_path(
      new maarpc.HandleStringRequest({
        handle,
        str: path.join(process.cwd(), 'install/share/resource')
      })
    )
  ).id
  console.log('resource post id', tid)
  await resource.wait(
    new maarpc.HandleIIdRequest({
      handle,
      id: tid
    })
  )

  await resource.destroy(new maarpc.HandleRequest({ handle }))

  await utility.unregister_callback(new maarpc.IdRequest({ id }))

  console.log('resource destroy')

  resource.close()
  utility.close()
}

main()
