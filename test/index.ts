import { MaaFrameworkLoader, MaaResource } from '..'

const loader = new MaaFrameworkLoader()

console.log(loader.load('./install/bin'))

const res = new MaaResource(loader, (msg, detail) => {
  console.log(msg, detail)
})

console.log(res.post('./install/share/resource'))

setTimeout(() => {}, 1000 * 60 * 60)
