import fs from 'fs/promises'

import {
  MaaAdbControllerTypeEnum,
  MaaController,
  MaaFrameworkLoader,
  MaaInstance,
  MaaResource
} from '..'

async function main() {
  const loader = new MaaFrameworkLoader()
  loader.load('./install/bin')

  loader.setLogging('./debug')

  const res = new MaaResource(loader)
  console.log(await res.load('./install/share/resource'))

  const ctrl = new MaaController(
    loader,
    'adb.exe',
    '127.0.0.1:16384',
    MaaAdbControllerTypeEnum.Input_Preset_Adb | MaaAdbControllerTypeEnum.Screencap_RawWithGzip,
    await fs.readFile('./install/share/controller_config.json', 'utf-8'),
    (msg, detail) => {
      console.log(msg, detail)
    }
  )
  console.log(await ctrl.connect())
  await ctrl.screencap()
  const buf = ctrl.image()
  if (buf) {
    await fs.writeFile('test.png', buf)
  }

  const inst = new MaaInstance(loader, (msg, detail) => {
    console.log(msg, detail)
  })

  inst.bindResource(res)
  inst.bindController(ctrl)

  console.log(inst.inited())
}

const res = setTimeout(() => {}, 1000 * 60 * 60)
main().then(() => {
  clearTimeout(res)
})
