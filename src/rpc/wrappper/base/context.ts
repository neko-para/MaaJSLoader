import * as grpc from '@grpc/grpc-js'

import {
  ConfigClient,
  ControllerClient,
  DeviceClient,
  ImageClient,
  InstanceClient,
  ResourceClient,
  UtilityClient
} from '.'
import * as maarpc from '../../gen'

export function setupClient(address: string, cred = grpc.credentials.createInsecure()) {
  return {
    utility: new UtilityClient(new maarpc.UtilityClient(address, cred)),
    image: new ImageClient(new maarpc.ImageClient(address, cred)),
    resource: new ResourceClient(new maarpc.ResourceClient(address, cred)),
    controller: new ControllerClient(new maarpc.ControllerClient(address, cred)),
    instance: new InstanceClient(new maarpc.InstanceClient(address, cred)),
    device: new DeviceClient(new maarpc.DeviceClient(address, cred)),
    config: new ConfigClient(new maarpc.ConfigClient(address, cred))
  }
}
