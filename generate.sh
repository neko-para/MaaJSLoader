#!/bin/sh

src_dir=./install/share/Interface/proto
dst_dir=./src/gen
protoc_gen_ts=`which protoc-gen-ts`
for src in ${src_dir}/*.proto; do
  echo $src
  grpc_tools_node_protoc --ts_out=unary_rpc_promise=true,target=node,no_namespace:${dst_dir}/ "--plugin=protoc-gen-ts=$protoc_gen_ts" -I $src_dir $src
done
