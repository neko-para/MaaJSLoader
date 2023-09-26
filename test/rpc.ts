import * as grpc from '@grpc/grpc-js'
import fs from 'fs/promises'
import path from 'path'

import * as maarpc from '../grpc'
import { AdbConfig } from './config'

async function main() {
  const c = grpc.credentials.createInsecure()
  const image = new maarpc.ImageClient('0.0.0.0:8080', c)
  const utility = new maarpc.UtilityClient('0.0.0.0:8080', c)
  const resource = new maarpc.ResourceClient('0.0.0.0:8080', c)
  const controller = new maarpc.ControllerClient('0.0.0.0:8080', c)

  utility.set_global_option(
    new maarpc.SetGlobalOptionRequest({
      logging: path.join(process.cwd(), 'debug')
    })
  )

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
  const handle = (
    await controller.create_adb(
      new maarpc.AdbControllerRequest({
        id,
        adb_path: 'adb',
        adb_serial: '127.0.0.1:62001',
        adb_type: 1 + (1 << 8) + (4 << 16),
        adb_config: AdbConfig
      })
    )
  ).handle
  console.log('controller handle', handle)
  const tcid = (
    await controller.post_connection(
      new maarpc.HandleRequest({
        handle
      })
    )
  ).id
  console.log('controller connect id', tcid)
  await controller.wait(
    new maarpc.HandleIIdRequest({
      handle,
      id: tcid
    })
  )

  const tsid = (await controller.post_screencap(new maarpc.HandleRequest({ handle }))).id
  console.log('controller screencap id', tcid)
  await controller.wait(
    new maarpc.HandleIIdRequest({
      handle,
      id: tsid
    })
  )

  const himg = (await image.create(new maarpc.EmptyRequest())).handle
  await controller.image(
    new maarpc.ControllerGetImageRequest({
      handle,
      image_handle: himg
    })
  )

  const buf = (await image.encoded(new maarpc.HandleRequest({ handle: himg }))).buf
  fs.writeFile('1.png', buf)

  await image.destroy(new maarpc.HandleRequest({ handle: himg }))

  await controller.destroy(new maarpc.HandleRequest({ handle }))

  await utility.unregister_callback(new maarpc.IdRequest({ id }))

  console.log('controller destroy')

  resource.close()
  utility.close()
}

main()
