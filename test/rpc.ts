import fs from 'fs/promises'
import path from 'path'

import * as maa from '../src/rpc'

class CC extends maa.CustomControllerBase {
  resolution(reso: [number, number]): boolean | Promise<boolean> {
    reso[0] = 1080
    reso[1] = 720
    return true
  }

  uuid(u: [string]): boolean | Promise<boolean> {
    u[0] = '114514'
    return true
  }
}

async function main() {
  maa.init('0.0.0.0:8080')

  await maa.set_logging(path.join(process.cwd(), 'debug'))

  const cb: maa.Callback = (msg, detail) => {
    console.log(msg, detail)
  }

  const cctrl = await maa.Controller.initCustom(cb, new CC())
  await cctrl.post_connection().wait()
  await cctrl.destroy()

  const ctrl = await maa.Controller.initAdb(cb, {
    serial: '127.0.0.1:62001'
  })

  await ctrl.post_connection().wait()
  await ctrl.post_screencap().wait()

  const img = await maa.Image.init()

  await ctrl.image(img)

  const buf = await img.encoded
  await fs.writeFile('1.png', buf)

  await img.destroy()
  await ctrl.destroy()
}

main()
