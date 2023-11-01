import type { ClientFlatContext } from '../flat'

export let context: ClientFlatContext

export function setContext(c: ClientFlatContext) {
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
