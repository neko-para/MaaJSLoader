import * as grpc from '@grpc/grpc-js'

import {
  ConfigClient,
  ControllerClient,
  DeviceClient,
  ImageClient,
  InstanceClient,
  ResourceClient,
  SyncCtxClient,
  UtilityClient
} from '.'
import * as maarpc from '../gen'

export type Context = ReturnType<typeof setupClient>

export function setupClient(address: string, cred = grpc.credentials.createInsecure()) {
  return {
    utility: new UtilityClient(new maarpc.UtilityClient(address, cred)),
    image: new ImageClient(new maarpc.ImageClient(address, cred)),
    resource: new ResourceClient(new maarpc.ResourceClient(address, cred)),
    controller: new ControllerClient(new maarpc.ControllerClient(address, cred)),
    instance: new InstanceClient(new maarpc.InstanceClient(address, cred)),
    syncctx: new SyncCtxClient(new maarpc.SyncContextClient(address, cred)),
    device: new DeviceClient(new maarpc.DeviceClient(address, cred)),
    config: new ConfigClient(new maarpc.ConfigClient(address, cred))
  }
}

export async function waitClientReady(ctx: Context) {
  try {
    await Promise.all(
      Object.entries(ctx).map(
        ([, c]) =>
          new Promise<void>((resolve, reject) => {
            c._client.waitForReady(Date.now() + 5000, err => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                resolve()
              }
            })
          })
      )
    )
    return true
  } catch (_) {
    Object.entries(ctx).forEach(([, c]) => {
      c._client.close()
    })
    return false
  }
}

export async function destroyContext(context: Context) {
  context.config._client.close()
  context.device._client.close()
  context.instance._client.close()
  context.controller._client.close()
  context.resource._client.close()
  context.image._client.close()
  context.utility._client.close()
}
