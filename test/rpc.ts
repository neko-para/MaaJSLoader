import * as grpc from '@grpc/grpc-js'
import fs from 'fs/promises'
import path from 'path'

import { setupClient } from '../src/rpc/wrappper/base'
import { AdbConfig } from './config'

async function main() {
  const ctx = setupClient('0.0.0.0:8080')

  await ctx.utility.set_logging(path.join(process.cwd(), 'debug'))

  const cbId = await ctx.utility.acquire_id()

  ctx.utility.register_callback(cbId, (msg, detail) => {
    console.log(msg, detail)
  })

  const hCtrl = await ctx.controller.createAdb(
    cbId,
    'adb',
    '127.0.0.1:62001',
    1 + (1 << 8) + (4 << 16),
    AdbConfig
  )

  console.log('controller handle', hCtrl)

  await ctx.controller.wait(hCtrl, await ctx.controller.post_connection(hCtrl))
  await ctx.controller.wait(hCtrl, await ctx.controller.post_screencap(hCtrl))

  const hImg = await ctx.image.create()

  await ctx.controller.image(hCtrl, hImg)

  const buf = await ctx.image.encoded(hImg)
  fs.writeFile('1.png', buf)

  await ctx.image.destroy(hImg)
  await ctx.controller.destroy(hCtrl)
  await ctx.utility.unregister_callback(cbId)

  console.log('controller destroy')
}

main()
