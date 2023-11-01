import * as grpc from '@grpc/grpc-js'

import { setContext } from '..'
import { Context, destroyContext, setupClient, waitClientReady } from '../base'
import { ClientFlatContext, ServerFlatContext, setupFlatContext } from '../flat/node'

export * from './index'

export let serverContext: ServerFlatContext

export function setServerContext(c: ServerFlatContext) {
  serverContext = c
}

export let rawContext: Context

export async function init(address: string, cred = grpc.credentials.createInsecure()) {
  rawContext = setupClient(address, cred)
  if (!(await waitClientReady(rawContext))) {
    return false
  }
  const ctx = setupFlatContext(rawContext)
  // TODO: add a basic convertion
  setContext(ctx as unknown as ClientFlatContext)
  setServerContext(ctx)
  return true
}

export async function deinit() {
  if (rawContext) {
    destroyContext(rawContext)
  }
}
