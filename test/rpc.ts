import * as grpc from '@grpc/grpc-js'
import path from 'path'

import * as maarpc from '../grpc'

async function main() {
  const utility = new maarpc.UtilityClient('0.0.0.0:8080', grpc.credentials.createInsecure())
  const resource = new maarpc.ResourceClient('0.0.0.0:8080', grpc.credentials.createInsecure())

  console.log((await utility.version(new maarpc.EmptyRequest())).value)
  const id = (await utility.acquire_callback_id(new maarpc.EmptyRequest())).id.id
  console.log('callback id', id)
  const stream = utility.register_callback(new maarpc.IdRequest({ id: new maarpc.Id({ id }) }))
  stream.on('readable', () => {
    const cb = stream.read() as unknown as maarpc.Callback
    if (cb) {
      console.log(cb.msg, cb.detail)
    } else {
      console.log(cb)
    }
  })
  const handle = (await resource.create(new maarpc.IdRequest({ id: new maarpc.Id({ id }) }))).value
    .handle
  console.log('resource handle', handle)
  const tid = (
    await resource.post_path(
      new maarpc.HandleStringRequest({
        handle: new maarpc.Handle({ handle }),
        str: path.join(process.cwd(), 'install/share/resource')
      })
    )
  ).id.id
  console.log('resource post id', tid)
  await resource.wait(
    new maarpc.HandleIdRequest({
      handle: new maarpc.Handle({ handle }),
      id: new maarpc.Id({ id: tid })
    })
  )

  await resource.destroy(new maarpc.HandleRequest({ handle: new maarpc.Handle({ handle }) }))

  await utility.unregister_callback(new maarpc.IdRequest({ id: new maarpc.Id({ id }) }))

  console.log('resource destroy')

  resource.close()
  utility.close()
}

main()
