import * as grpc from '@grpc/grpc-js'

import { setContext } from '..'
import { Context, destroyContext, setupClient, waitClientReady } from '../base'
import { setupFlatContext } from '../flat'

export * from './index'

export let rawContext: Context

export async function init(address: string, cred = grpc.credentials.createInsecure()) {
  rawContext = setupClient(address, cred)
  if (!(await waitClientReady(rawContext))) {
    return false
  }
  setContext(setupFlatContext(rawContext))
  return true
}

export async function deinit() {
  destroyContext(rawContext)
}
