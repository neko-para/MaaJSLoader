import { MaaCoreLoader } from '..'

async function main() {
  const loader = new MaaCoreLoader()
  loader.load('./install.core')
}

main()
