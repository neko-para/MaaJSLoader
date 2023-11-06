import * as grpc from '@grpc/grpc-js'

import * as maarpc from '../gen'

export type BackendContext = ReturnType<typeof setupContext>

export function setupContext(address: string, cred = grpc.credentials.createInsecure()) {
  return {
    utility: new maarpc.UtilityClient(address, cred),
    image: new maarpc.ImageClient(address, cred),
    resource: new maarpc.ResourceClient(address, cred),
    controller: new maarpc.ControllerClient(address, cred),
    instance: new maarpc.InstanceClient(address, cred),
    syncctx: new maarpc.SyncContextClient(address, cred),
    device: new maarpc.DeviceClient(address, cred),
    config: new maarpc.ConfigClient(address, cred)
  }
}

export async function waitClientReady(ctx: BackendContext) {
  try {
    await Promise.all(
      Object.entries(ctx).map(
        ([, c]) =>
          new Promise<void>((resolve, reject) => {
            c.waitForReady(Date.now() + 5000, err => {
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
      c.close()
    })
    return false
  }
}

export async function destroyContext(context: BackendContext) {
  context.config.close()
  context.device.close()
  context.instance.close()
  context.controller.close()
  context.resource.close()
  context.image.close()
  context.utility.close()
}
