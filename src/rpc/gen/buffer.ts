/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: buffer.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./types";
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export class ImageInfoResponse extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2]];
    constructor(data?: any[] | ({} & (({
        type?: number;
    }) | ({
        size?: dependency_1.Size;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("type" in data && data.type != undefined) {
                this.type = data.type;
            }
            if ("size" in data && data.size != undefined) {
                this.size = data.size;
            }
        }
    }
    get type() {
        return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
    }
    set type(value: number) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_type() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get size() {
        return pb_1.Message.getWrapperField(this, dependency_1.Size, 2) as dependency_1.Size;
    }
    set size(value: dependency_1.Size) {
        pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[1], value);
    }
    get has_size() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get _type() {
        const cases: {
            [index: number]: "none" | "type";
        } = {
            0: "none",
            1: "type"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _size() {
        const cases: {
            [index: number]: "none" | "size";
        } = {
            0: "none",
            2: "size"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    static fromObject(data: {
        type?: number;
        size?: ReturnType<typeof dependency_1.Size.prototype.toObject>;
    }): ImageInfoResponse {
        const message = new ImageInfoResponse({});
        if (data.type != null) {
            message.type = data.type;
        }
        if (data.size != null) {
            message.size = dependency_1.Size.fromObject(data.size);
        }
        return message;
    }
    toObject() {
        const data: {
            type?: number;
            size?: ReturnType<typeof dependency_1.Size.prototype.toObject>;
        } = {};
        if (this.type != null) {
            data.type = this.type;
        }
        if (this.size != null) {
            data.size = this.size.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_type)
            writer.writeInt32(1, this.type);
        if (this.has_size)
            writer.writeMessage(2, this.size, () => this.size.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ImageInfoResponse {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ImageInfoResponse();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.type = reader.readInt32();
                    break;
                case 2:
                    reader.readMessage(message.size, () => message.size = dependency_1.Size.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): ImageInfoResponse {
        return ImageInfoResponse.deserialize(bytes);
    }
}
interface GrpcUnaryServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
}
interface GrpcStreamServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
}
interface GrpWritableServiceInterface<P, R> {
    (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
}
interface GrpcChunkServiceInterface<P, R> {
    (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
}
interface GrpcPromiseServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
    (message: P, options?: grpc_1.CallOptions): Promise<R>;
}
export abstract class UnimplementedImageService {
    static definition = {
        create: {
            path: "/maarpc.Image/create",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.EmptyRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.EmptyRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.HandleResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.HandleResponse.deserialize(new Uint8Array(bytes))
        },
        destroy: {
            path: "/maarpc.Image/destroy",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.EmptyResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.EmptyResponse.deserialize(new Uint8Array(bytes))
        },
        is_empty: {
            path: "/maarpc.Image/is_empty",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.BoolResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.BoolResponse.deserialize(new Uint8Array(bytes))
        },
        clear: {
            path: "/maarpc.Image/clear",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.EmptyResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.EmptyResponse.deserialize(new Uint8Array(bytes))
        },
        info: {
            path: "/maarpc.Image/info",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: ImageInfoResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => ImageInfoResponse.deserialize(new Uint8Array(bytes))
        },
        encoded: {
            path: "/maarpc.Image/encoded",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.BufferResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.BufferResponse.deserialize(new Uint8Array(bytes))
        },
        set_encoded: {
            path: "/maarpc.Image/set_encoded",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: dependency_1.HandleBufferRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => dependency_1.HandleBufferRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: dependency_1.BoolResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => dependency_1.BoolResponse.deserialize(new Uint8Array(bytes))
        }
    };
    [method: string]: grpc_1.UntypedHandleCall;
    abstract create(call: grpc_1.ServerUnaryCall<dependency_1.EmptyRequest, dependency_1.HandleResponse>, callback: grpc_1.sendUnaryData<dependency_1.HandleResponse>): void;
    abstract destroy(call: grpc_1.ServerUnaryCall<dependency_1.HandleRequest, dependency_1.EmptyResponse>, callback: grpc_1.sendUnaryData<dependency_1.EmptyResponse>): void;
    abstract is_empty(call: grpc_1.ServerUnaryCall<dependency_1.HandleRequest, dependency_1.BoolResponse>, callback: grpc_1.sendUnaryData<dependency_1.BoolResponse>): void;
    abstract clear(call: grpc_1.ServerUnaryCall<dependency_1.HandleRequest, dependency_1.EmptyResponse>, callback: grpc_1.sendUnaryData<dependency_1.EmptyResponse>): void;
    abstract info(call: grpc_1.ServerUnaryCall<dependency_1.HandleRequest, ImageInfoResponse>, callback: grpc_1.sendUnaryData<ImageInfoResponse>): void;
    abstract encoded(call: grpc_1.ServerUnaryCall<dependency_1.HandleRequest, dependency_1.BufferResponse>, callback: grpc_1.sendUnaryData<dependency_1.BufferResponse>): void;
    abstract set_encoded(call: grpc_1.ServerUnaryCall<dependency_1.HandleBufferRequest, dependency_1.BoolResponse>, callback: grpc_1.sendUnaryData<dependency_1.BoolResponse>): void;
}
export class ImageClient extends grpc_1.makeGenericClientConstructor(UnimplementedImageService.definition, "Image", {}) {
    constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
        super(address, credentials, options);
    }
    create: GrpcPromiseServiceInterface<dependency_1.EmptyRequest, dependency_1.HandleResponse> = (message: dependency_1.EmptyRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.HandleResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.create(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.HandleResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    destroy: GrpcPromiseServiceInterface<dependency_1.HandleRequest, dependency_1.EmptyResponse> = (message: dependency_1.HandleRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.EmptyResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.destroy(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.EmptyResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    is_empty: GrpcPromiseServiceInterface<dependency_1.HandleRequest, dependency_1.BoolResponse> = (message: dependency_1.HandleRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.BoolResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.is_empty(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.BoolResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    clear: GrpcPromiseServiceInterface<dependency_1.HandleRequest, dependency_1.EmptyResponse> = (message: dependency_1.HandleRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.EmptyResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.clear(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.EmptyResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    info: GrpcPromiseServiceInterface<dependency_1.HandleRequest, ImageInfoResponse> = (message: dependency_1.HandleRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<ImageInfoResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.info(message, metadata, options, (error: grpc_1.ServiceError, response: ImageInfoResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    encoded: GrpcPromiseServiceInterface<dependency_1.HandleRequest, dependency_1.BufferResponse> = (message: dependency_1.HandleRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.BufferResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.encoded(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.BufferResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
    set_encoded: GrpcPromiseServiceInterface<dependency_1.HandleBufferRequest, dependency_1.BoolResponse> = (message: dependency_1.HandleBufferRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): Promise<dependency_1.BoolResponse> => { if (!metadata) {
        metadata = new grpc_1.Metadata;
    } if (!options) {
        options = {};
    } return new Promise((resolve, reject) => super.set_encoded(message, metadata, options, (error: grpc_1.ServiceError, response: dependency_1.BoolResponse) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(response);
        }
    })); };
}