import * as grpc from '@grpc/grpc-js'

import * as maarpc from '../grpc'

const client = new maarpc.MaaFrameworkClient('0.0.0.0:8080', grpc.credentials.createInsecure())

client.version(new maarpc.EmptyRequest()).then(res => {
  console.log(res.value)
})
