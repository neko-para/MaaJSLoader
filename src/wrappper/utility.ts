import { context } from '.'

export async function version() {
  return await context.utility.version()
}

export async function set_logging(path: string) {
  await context.utility.set_logging(path)
}

export async function set_debug_mode(mode: boolean) {
  await context.utility.set_debug_mode(mode)
}
