import {
  Backend,
  Frontend,
  Resource,
  definitions,
  directAdapter,
  setFrontend,
  setupContext,
  waitClientReady
} from '..'

async function main() {
  const [bs, fs] = directAdapter()

  const ctx = setupContext('127.0.0.1:8080')
  await waitClientReady(ctx)

  const back = new Backend(bs)
  const front = new Frontend(fs)

  back.init()
  front.init()

  back.add_all(ctx, definitions)
  front.add_all(definitions)

  setFrontend(front)

  const res = await Resource.init()
  res.onCallback = async (msg, detail) => {
    console.log(msg, detail)
    await new Promise<void>(resolve => {
      setTimeout(resolve, 2000)
    })
    console.log('<<<', msg, detail)
  }
  await res.post_path(process.cwd()).wait()
  await res.destroy()
}

main()
