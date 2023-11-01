import { LoggingLevel, context } from '.'

export async function version() {
  return await context['utility.version']()
}

export async function set_log_dir(path: string) {
  await context['utility.set_log_dir'](path)
}

export async function set_save_draw(save: boolean) {
  await context['utility.set_save_draw'](save)
}

export async function set_recording(record: boolean) {
  await context['utility.set_recording'](record)
}

export async function set_stdout_level(level: LoggingLevel) {
  await context['utility.set_stdout_level'](level)
}

export async function set_show_draw(show: boolean) {
  await context['utility.set_show_draw'](show)
}
