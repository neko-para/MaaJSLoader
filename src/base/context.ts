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

export async function waitClientReady(ctx: ReturnType<typeof setupClient>) {
  try {
    await Promise.all(
      Object.entries(ctx).map(
        ([, c]) =>
          new Promise<void>((resolve, reject) => {
            c._client.waitForReady(2000, err => {
              if (err) {
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
