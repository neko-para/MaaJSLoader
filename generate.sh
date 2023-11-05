#!/bin/sh

# grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./grpc/ --grpc_out=./grpc/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` -I install/share install/share/Framework.proto install/share/Types.proto 

src_dir=./install/share/Interface/proto
dst_dir=./src/gen
for src in ${src_dir}/*.proto; do
  echo $src
  grpc_tools_node_protoc --ts_out=unary_rpc_promise=true,target=node,no_namespace:${dst_dir}/ "--plugin=protoc-gen-ts=`which protoc-gen-ts`.cmd" -I $src_dir $src
done

