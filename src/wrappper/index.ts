import { FlatContext } from '../flat'

export let context: FlatContext

export function setContext(c: FlatContext) {
  context = c
}

export * from './buffer'
export * from './controller'
export * from './device'
export * from './instance'
export * from './resource'
export * from './syncctx'
export * from './types'
export * from './utility'
