import * as grpc from '@grpc/grpc-js'

import { Context, setupClient, waitClientReady } from '../base'

export let context: Context

export async function init(address: string, cred = grpc.credentials.createInsecure()) {
  context = setupClient(address, cred)
  return await waitClientReady(context)
}

export async function deinit() {
  context.config._client.close()
  context.device._client.close()
  context.instance._client.close()
  context.controller._client.close()
  context.resource._client.close()
  context.image._client.close()
  context.utility._client.close()
}

export * from './buffer'
export * from './controller'
export * from './device'
export * from './instance'
export * from './resource'
export * from './syncctx'
export * from './types'
export * from './utility'
