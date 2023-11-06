import { Backend, Frontend, definitions, directAdapter, setupContext, waitClientReady } from '..'

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

  const client = front.cast_client<typeof definitions>()

  const id = (await client['utility.acquire_id']({}))?.id

  client['utility.register_callback']({ id }, args => {
    console.log(args)
  })
}

main()
