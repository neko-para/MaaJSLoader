import { AsstInstance, MaaCoreLoader } from '..'

async function main() {
  const loader = new MaaCoreLoader()
  loader.load('./install.core')

  const instance = new AsstInstance(loader, (msg, details) => {
    console.log(msg, JSON.parse(details))
  })
}

main()
