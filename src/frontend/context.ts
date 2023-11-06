import { definitions } from '../definition'
import { Frontend, TranslateAllService } from '../helper'

export type FrontContext = TranslateAllService<typeof definitions>

let client: Frontend
export let context: FrontContext
export let contextInput: Partial<Record<string, (arg: any) => Promise<void>>>
export let contextOutput: Partial<Record<string, (arg: any) => void>>

export function setFrontend(front: Frontend) {
  client = front
  context = front.cast_client<typeof definitions>()
  contextInput = front.input
  contextOutput = front.output
}
