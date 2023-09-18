import fs from 'fs/promises'

import {
  MaaConfig,
  MaaController,
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

  const c = MaaConfig.add(tloader, 'bbb')
  if (c) {
    c.description = '999'
    console.log(c.name, c.description)
  }

  // console.log(tloader.find_device())

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
      },
      get_resolution: () => [640, 480],
      get_uuid: () => '114514'
    },
    (msg, detail) => {
      console.log(msg, detail)
    }
  )
  console.log(await ctrl.connect())
  await ctrl.screencap()
  await ctrl.click(1, 2).promise
  const buf = ctrl.image()
  // if (buf) {
  //   await fs.writeFile('test.png', buf.encoded())
  // }

  const inst = new MaaInstance(loader, (msg, detail) => {
    console.log(msg, detail)
  })

  inst.bindResource(res)
  inst.bindController(ctrl)

  console.log(inst.inited)

  await inst.destroy()
  await ctrl.destroy()
  await res.destroy()
}

const res = setTimeout(() => {}, 1000 * 60 * 60)
testToolKit().then(() => {
  clearTimeout(res)
})
// testFramework().then(() => {
//   clearTimeout(res)
// })
