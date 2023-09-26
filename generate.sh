#!/bin/sh

# grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./grpc/ --grpc_out=./grpc/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` -I install/share install/share/Framework.proto install/share/Types.proto 

for src in ./install/share/interfaces/*.proto; do
  grpc_tools_node_protoc --ts_out=unary_rpc_promise=true,target=node,no_namespace:./grpc/ --plugin=protoc-gen-ts=`which protoc-gen-ts` -I install/share/interfaces $src
done

