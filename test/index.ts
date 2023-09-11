import fs from 'fs/promises'

import {
  MaaConfig,
  MaaController,
  MaaFindDevice,
  MaaFrameworkLoader,
  MaaInstance,
  MaaResource,
  MaaToolKitLoader
} from '..'

async function testToolKit() {
  const tloader = new MaaToolKitLoader()
  tloader.load('./install/bin')
  tloader.init()

  console.log(tloader.get('123'))
  tloader.set('123', '456')
  console.log(tloader.get('123'))

  console.log(MaaFindDevice(tloader))
  // const c = MaaConfig.get(tloader, 1)
  // console.log(c.name, c.description)
  // const cc = c.clone('111')
  // cc.setDescription('222')
  // console.log(cc.name, cc.description)
  // console.log(MaaConfig.size(tloader))
  tloader.uninit()
}

async function testFramework() {
  const loader = new MaaFrameworkLoader()
  loader.load('./install/bin')

  loader.setLogging('./debug')

  const res = new MaaResource(loader)
  console.log(await res.load('./install/share/resource'))

  // const ctrl = MaaController.createAdbController(
  //   loader,
  //   'adb.exe',
  //   '127.0.0.1:16384',
  //   MaaAdbControllerTypeEnum.Input_Preset_Adb | MaaAdbControllerTypeEnum.Screencap_RawWithGzip,
  //   await fs.readFile('./install/share/controller_config.json', 'utf-8'),
  //   (msg, detail) => {
  //     console.log(msg, detail)
  //   }
  // )
  const ctrl = MaaController.createCustomController(
    loader,
    {
      connect: () => {
        return true
      }
    },
    (msg, detail) => {
      console.log(msg, detail)
    }
  )
  console.log(await ctrl.connect())
  await ctrl.screencap()
  const buf = ctrl.image()
  if (buf) {
    await fs.writeFile('test.png', buf.encoded())
  }

  const inst = new MaaInstance(loader, (msg, detail) => {
    console.log(msg, detail)
  })

  inst.bindResource(res)
  inst.bindController(ctrl)

  console.log(inst.inited)
}

const res = setTimeout(() => {}, 1000 * 60 * 60)
testToolKit().then(() => {
  clearTimeout(res)
})
