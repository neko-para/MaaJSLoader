/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: custom.controller.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./types";
import * as pb_1 from "google-protobuf";
export class CustomControllerSetOptionParam extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2]];
    constructor(data?: any[] | ({} & (({
        key?: number;
    }) | ({
        value?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("key" in data && data.key != undefined) {
                this.key = data.key;
            }
            if ("value" in data && data.value != undefined) {
                this.value = data.value;
            }
        }
    }
    get key() {
        return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
    }
    set key(value: number) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_key() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get value() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set value(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[1], value);
    }
    get has_value() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get _key() {
        const cases: {
            [index: number]: "none" | "key";
        } = {
            0: "none",
            1: "key"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _value() {
        const cases: {
            [index: number]: "none" | "value";
        } = {
            0: "none",
            2: "value"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    static fromObject(data: {
        key?: number;
        value?: string;
    }): CustomControllerSetOptionParam {
        const message = new CustomControllerSetOptionParam({});
        if (data.key != null) {
            message.key = data.key;
        }
        if (data.value != null) {
            message.value = data.value;
        }
        return message;
    }
    toObject() {
        const data: {
            key?: number;
            value?: string;
        } = {};
        if (this.key != null) {
            data.key = this.key;
        }
        if (this.value != null) {
            data.value = this.value;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_key)
            writer.writeInt32(1, this.key);
        if (this.has_value)
            writer.writeString(2, this.value);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomControllerSetOptionParam {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomControllerSetOptionParam();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.key = reader.readInt32();
                    break;
                case 2:
                    message.value = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomControllerSetOptionParam {
        return CustomControllerSetOptionParam.deserialize(bytes);
    }
}
export class CustomControllerRequest extends pb_1.Message {
    #one_of_decls: number[][] = [[101, 201, 202], [1]];
    constructor(data?: any[] | ({} & (({
        init?: string;
        resolution?: never;
        uuid?: never;
    } | {
        init?: never;
        resolution?: dependency_1.Size;
        uuid?: never;
    } | {
        init?: never;
        resolution?: never;
        uuid?: string;
    }) | ({
        ok?: boolean;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("ok" in data && data.ok != undefined) {
                this.ok = data.ok;
            }
            if ("init" in data && data.init != undefined) {
                this.init = data.init;
            }
            if ("resolution" in data && data.resolution != undefined) {
                this.resolution = data.resolution;
            }
            if ("uuid" in data && data.uuid != undefined) {
                this.uuid = data.uuid;
            }
        }
    }
    get ok() {
        return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
    }
    set ok(value: boolean) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[1], value);
    }
    get has_ok() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get init() {
        return pb_1.Message.getFieldWithDefault(this, 101, "") as string;
    }
    set init(value: string) {
        pb_1.Message.setOneofField(this, 101, this.#one_of_decls[0], value);
    }
    get has_init() {
        return pb_1.Message.getField(this, 101) != null;
    }
    get resolution() {
        return pb_1.Message.getWrapperField(this, dependency_1.Size, 201) as dependency_1.Size;
    }
    set resolution(value: dependency_1.Size) {
        pb_1.Message.setOneofWrapperField(this, 201, this.#one_of_decls[0], value);
    }
    get has_resolution() {
        return pb_1.Message.getField(this, 201) != null;
    }
    get uuid() {
        return pb_1.Message.getFieldWithDefault(this, 202, "") as string;
    }
    set uuid(value: string) {
        pb_1.Message.setOneofField(this, 202, this.#one_of_decls[0], value);
    }
    get has_uuid() {
        return pb_1.Message.getField(this, 202) != null;
    }
    get result() {
        const cases: {
            [index: number]: "none" | "init" | "resolution" | "uuid";
        } = {
            0: "none",
            101: "init",
            201: "resolution",
            202: "uuid"
        };
        return cases[pb_1.Message.computeOneofCase(this, [101, 201, 202])];
    }
    get _ok() {
        const cases: {
            [index: number]: "none" | "ok";
        } = {
            0: "none",
            1: "ok"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    static fromObject(data: {
        ok?: boolean;
        init?: string;
        resolution?: ReturnType<typeof dependency_1.Size.prototype.toObject>;
        uuid?: string;
    }): CustomControllerRequest {
        const message = new CustomControllerRequest({});
        if (data.ok != null) {
            message.ok = data.ok;
        }
        if (data.init != null) {
            message.init = data.init;
        }
        if (data.resolution != null) {
            message.resolution = dependency_1.Size.fromObject(data.resolution);
        }
        if (data.uuid != null) {
            message.uuid = data.uuid;
        }
        return message;
    }
    toObject() {
        const data: {
            ok?: boolean;
            init?: string;
            resolution?: ReturnType<typeof dependency_1.Size.prototype.toObject>;
            uuid?: string;
        } = {};
        if (this.ok != null) {
            data.ok = this.ok;
        }
        if (this.init != null) {
            data.init = this.init;
        }
        if (this.resolution != null) {
            data.resolution = this.resolution.toObject();
        }
        if (this.uuid != null) {
            data.uuid = this.uuid;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_ok)
            writer.writeBool(1, this.ok);
        if (this.has_init)
            writer.writeString(101, this.init);
        if (this.has_resolution)
            writer.writeMessage(201, this.resolution, () => this.resolution.serialize(writer));
        if (this.has_uuid)
            writer.writeString(202, this.uuid);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomControllerRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomControllerRequest();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.ok = reader.readBool();
                    break;
                case 101:
                    message.init = reader.readString();
                    break;
                case 201:
                    reader.readMessage(message.resolution, () => message.resolution = dependency_1.Size.deserialize(reader));
                    break;
                case 202:
                    message.uuid = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomControllerRequest {
        return CustomControllerRequest.deserialize(bytes);
    }
}
export class CustomControllerResponse extends pb_1.Message {
    #one_of_decls: number[][] = [[101, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213]];
    constructor(data?: any[] | ({} & (({
        init?: string;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: boolean;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: dependency_1.ClickParam;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: dependency_1.SwipeParam;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: dependency_1.KeyParam;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: dependency_1.TouchParam;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: dependency_1.TouchParam;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: dependency_1.TouchParam;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: string;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: string;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: boolean;
        image?: never;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: string;
        uuid?: never;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: boolean;
        set_option?: never;
    } | {
        init?: never;
        connect?: never;
        click?: never;
        swipe?: never;
        key?: never;
        touch_down?: never;
        touch_move?: never;
        touch_up?: never;
        start?: never;
        stop?: never;
        resolution?: never;
        image?: never;
        uuid?: never;
        set_option?: CustomControllerSetOptionParam;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("init" in data && data.init != undefined) {
                this.init = data.init;
            }
            if ("connect" in data && data.connect != undefined) {
                this.connect = data.connect;
            }
            if ("click" in data && data.click != undefined) {
                this.click = data.click;
            }
            if ("swipe" in data && data.swipe != undefined) {
                this.swipe = data.swipe;
            }
            if ("key" in data && data.key != undefined) {
                this.key = data.key;
            }
            if ("touch_down" in data && data.touch_down != undefined) {
                this.touch_down = data.touch_down;
            }
            if ("touch_move" in data && data.touch_move != undefined) {
                this.touch_move = data.touch_move;
            }
            if ("touch_up" in data && data.touch_up != undefined) {
                this.touch_up = data.touch_up;
            }
            if ("start" in data && data.start != undefined) {
                this.start = data.start;
            }
            if ("stop" in data && data.stop != undefined) {
                this.stop = data.stop;
            }
            if ("resolution" in data && data.resolution != undefined) {
                this.resolution = data.resolution;
            }
            if ("image" in data && data.image != undefined) {
                this.image = data.image;
            }
            if ("uuid" in data && data.uuid != undefined) {
                this.uuid = data.uuid;
            }
            if ("set_option" in data && data.set_option != undefined) {
                this.set_option = data.set_option;
            }
        }
    }
    get init() {
        return pb_1.Message.getFieldWithDefault(this, 101, "") as string;
    }
    set init(value: string) {
        pb_1.Message.setOneofField(this, 101, this.#one_of_decls[0], value);
    }
    get has_init() {
        return pb_1.Message.getField(this, 101) != null;
    }
    get connect() {
        return pb_1.Message.getFieldWithDefault(this, 201, false) as boolean;
    }
    set connect(value: boolean) {
        pb_1.Message.setOneofField(this, 201, this.#one_of_decls[0], value);
    }
    get has_connect() {
        return pb_1.Message.getField(this, 201) != null;
    }
    get click() {
        return pb_1.Message.getWrapperField(this, dependency_1.ClickParam, 202) as dependency_1.ClickParam;
    }
    set click(value: dependency_1.ClickParam) {
        pb_1.Message.setOneofWrapperField(this, 202, this.#one_of_decls[0], value);
    }
    get has_click() {
        return pb_1.Message.getField(this, 202) != null;
    }
    get swipe() {
        return pb_1.Message.getWrapperField(this, dependency_1.SwipeParam, 203) as dependency_1.SwipeParam;
    }
    set swipe(value: dependency_1.SwipeParam) {
        pb_1.Message.setOneofWrapperField(this, 203, this.#one_of_decls[0], value);
    }
    get has_swipe() {
        return pb_1.Message.getField(this, 203) != null;
    }
    get key() {
        return pb_1.Message.getWrapperField(this, dependency_1.KeyParam, 204) as dependency_1.KeyParam;
    }
    set key(value: dependency_1.KeyParam) {
        pb_1.Message.setOneofWrapperField(this, 204, this.#one_of_decls[0], value);
    }
    get has_key() {
        return pb_1.Message.getField(this, 204) != null;
    }
    get touch_down() {
        return pb_1.Message.getWrapperField(this, dependency_1.TouchParam, 205) as dependency_1.TouchParam;
    }
    set touch_down(value: dependency_1.TouchParam) {
        pb_1.Message.setOneofWrapperField(this, 205, this.#one_of_decls[0], value);
    }
    get has_touch_down() {
        return pb_1.Message.getField(this, 205) != null;
    }
    get touch_move() {
        return pb_1.Message.getWrapperField(this, dependency_1.TouchParam, 206) as dependency_1.TouchParam;
    }
    set touch_move(value: dependency_1.TouchParam) {
        pb_1.Message.setOneofWrapperField(this, 206, this.#one_of_decls[0], value);
    }
    get has_touch_move() {
        return pb_1.Message.getField(this, 206) != null;
    }
    get touch_up() {
        return pb_1.Message.getWrapperField(this, dependency_1.TouchParam, 207) as dependency_1.TouchParam;
    }
    set touch_up(value: dependency_1.TouchParam) {
        pb_1.Message.setOneofWrapperField(this, 207, this.#one_of_decls[0], value);
    }
    get has_touch_up() {
        return pb_1.Message.getField(this, 207) != null;
    }
    get start() {
        return pb_1.Message.getFieldWithDefault(this, 208, "") as string;
    }
    set start(value: string) {
        pb_1.Message.setOneofField(this, 208, this.#one_of_decls[0], value);
    }
    get has_start() {
        return pb_1.Message.getField(this, 208) != null;
    }
    get stop() {
        return pb_1.Message.getFieldWithDefault(this, 209, "") as string;
    }
    set stop(value: string) {
        pb_1.Message.setOneofField(this, 209, this.#one_of_decls[0], value);
    }
    get has_stop() {
        return pb_1.Message.getField(this, 209) != null;
    }
    get resolution() {
        return pb_1.Message.getFieldWithDefault(this, 210, false) as boolean;
    }
    set resolution(value: boolean) {
        pb_1.Message.setOneofField(this, 210, this.#one_of_decls[0], value);
    }
    get has_resolution() {
        return pb_1.Message.getField(this, 210) != null;
    }
    get image() {
        return pb_1.Message.getFieldWithDefault(this, 211, "") as string;
    }
    set image(value: string) {
        pb_1.Message.setOneofField(this, 211, this.#one_of_decls[0], value);
    }
    get has_image() {
        return pb_1.Message.getField(this, 211) != null;
    }
    get uuid() {
        return pb_1.Message.getFieldWithDefault(this, 212, false) as boolean;
    }
    set uuid(value: boolean) {
        pb_1.Message.setOneofField(this, 212, this.#one_of_decls[0], value);
    }
    get has_uuid() {
        return pb_1.Message.getField(this, 212) != null;
    }
    get set_option() {
        return pb_1.Message.getWrapperField(this, CustomControllerSetOptionParam, 213) as CustomControllerSetOptionParam;
    }
    set set_option(value: CustomControllerSetOptionParam) {
        pb_1.Message.setOneofWrapperField(this, 213, this.#one_of_decls[0], value);
    }
    get has_set_option() {
        return pb_1.Message.getField(this, 213) != null;
    }
    get command() {
        const cases: {
            [index: number]: "none" | "init" | "connect" | "click" | "swipe" | "key" | "touch_down" | "touch_move" | "touch_up" | "start" | "stop" | "resolution" | "image" | "uuid" | "set_option";
        } = {
            0: "none",
            101: "init",
            201: "connect",
            202: "click",
            203: "swipe",
            204: "key",
            205: "touch_down",
            206: "touch_move",
            207: "touch_up",
            208: "start",
            209: "stop",
            210: "resolution",
            211: "image",
            212: "uuid",
            213: "set_option"
        };
        return cases[pb_1.Message.computeOneofCase(this, [101, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213])];
    }
    static fromObject(data: {
        init?: string;
        connect?: boolean;
        click?: ReturnType<typeof dependency_1.ClickParam.prototype.toObject>;
        swipe?: ReturnType<typeof dependency_1.SwipeParam.prototype.toObject>;
        key?: ReturnType<typeof dependency_1.KeyParam.prototype.toObject>;
        touch_down?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
        touch_move?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
        touch_up?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
        start?: string;
        stop?: string;
        resolution?: boolean;
        image?: string;
        uuid?: boolean;
        set_option?: ReturnType<typeof CustomControllerSetOptionParam.prototype.toObject>;
    }): CustomControllerResponse {
        const message = new CustomControllerResponse({});
        if (data.init != null) {
            message.init = data.init;
        }
        if (data.connect != null) {
            message.connect = data.connect;
        }
        if (data.click != null) {
            message.click = dependency_1.ClickParam.fromObject(data.click);
        }
        if (data.swipe != null) {
            message.swipe = dependency_1.SwipeParam.fromObject(data.swipe);
        }
        if (data.key != null) {
            message.key = dependency_1.KeyParam.fromObject(data.key);
        }
        if (data.touch_down != null) {
            message.touch_down = dependency_1.TouchParam.fromObject(data.touch_down);
        }
        if (data.touch_move != null) {
            message.touch_move = dependency_1.TouchParam.fromObject(data.touch_move);
        }
        if (data.touch_up != null) {
            message.touch_up = dependency_1.TouchParam.fromObject(data.touch_up);
        }
        if (data.start != null) {
            message.start = data.start;
        }
        if (data.stop != null) {
            message.stop = data.stop;
        }
        if (data.resolution != null) {
            message.resolution = data.resolution;
        }
        if (data.image != null) {
            message.image = data.image;
        }
        if (data.uuid != null) {
            message.uuid = data.uuid;
        }
        if (data.set_option != null) {
            message.set_option = CustomControllerSetOptionParam.fromObject(data.set_option);
        }
        return message;
    }
    toObject() {
        const data: {
            init?: string;
            connect?: boolean;
            click?: ReturnType<typeof dependency_1.ClickParam.prototype.toObject>;
            swipe?: ReturnType<typeof dependency_1.SwipeParam.prototype.toObject>;
            key?: ReturnType<typeof dependency_1.KeyParam.prototype.toObject>;
            touch_down?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
            touch_move?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
            touch_up?: ReturnType<typeof dependency_1.TouchParam.prototype.toObject>;
            start?: string;
            stop?: string;
            resolution?: boolean;
            image?: string;
            uuid?: boolean;
            set_option?: ReturnType<typeof CustomControllerSetOptionParam.prototype.toObject>;
        } = {};
        if (this.init != null) {
            data.init = this.init;
        }
        if (this.connect != null) {
            data.connect = this.connect;
        }
        if (this.click != null) {
            data.click = this.click.toObject();
        }
        if (this.swipe != null) {
            data.swipe = this.swipe.toObject();
        }
        if (this.key != null) {
            data.key = this.key.toObject();
        }
        if (this.touch_down != null) {
            data.touch_down = this.touch_down.toObject();
        }
        if (this.touch_move != null) {
            data.touch_move = this.touch_move.toObject();
        }
        if (this.touch_up != null) {
            data.touch_up = this.touch_up.toObject();
        }
        if (this.start != null) {
            data.start = this.start;
        }
        if (this.stop != null) {
            data.stop = this.stop;
        }
        if (this.resolution != null) {
            data.resolution = this.resolution;
        }
        if (this.image != null) {
            data.image = this.image;
        }
        if (this.uuid != null) {
            data.uuid = this.uuid;
        }
        if (this.set_option != null) {
            data.set_option = this.set_option.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_init)
            writer.writeString(101, this.init);
        if (this.has_connect)
            writer.writeBool(201, this.connect);
        if (this.has_click)
            writer.writeMessage(202, this.click, () => this.click.serialize(writer));
        if (this.has_swipe)
            writer.writeMessage(203, this.swipe, () => this.swipe.serialize(writer));
        if (this.has_key)
            writer.writeMessage(204, this.key, () => this.key.serialize(writer));
        if (this.has_touch_down)
            writer.writeMessage(205, this.touch_down, () => this.touch_down.serialize(writer));
        if (this.has_touch_move)
            writer.writeMessage(206, this.touch_move, () => this.touch_move.serialize(writer));
        if (this.has_touch_up)
            writer.writeMessage(207, this.touch_up, () => this.touch_up.serialize(writer));
        if (this.has_start)
            writer.writeString(208, this.start);
        if (this.has_stop)
            writer.writeString(209, this.stop);
        if (this.has_resolution)
            writer.writeBool(210, this.resolution);
        if (this.has_image)
            writer.writeString(211, this.image);
        if (this.has_uuid)
            writer.writeBool(212, this.uuid);
        if (this.has_set_option)
            writer.writeMessage(213, this.set_option, () => this.set_option.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomControllerResponse {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomControllerResponse();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 101:
                    message.init = reader.readString();
                    break;
                case 201:
                    message.connect = reader.readBool();
                    break;
                case 202:
                    reader.readMessage(message.click, () => message.click = dependency_1.ClickParam.deserialize(reader));
                    break;
                case 203:
                    reader.readMessage(message.swipe, () => message.swipe = dependency_1.SwipeParam.deserialize(reader));
                    break;
                case 204:
                    reader.readMessage(message.key, () => message.key = dependency_1.KeyParam.deserialize(reader));
                    break;
                case 205:
                    reader.readMessage(message.touch_down, () => message.touch_down = dependency_1.TouchParam.deserialize(reader));
                    break;
                case 206:
                    reader.readMessage(message.touch_move, () => message.touch_move = dependency_1.TouchParam.deserialize(reader));
                    break;
                case 207:
                    reader.readMessage(message.touch_up, () => message.touch_up = dependency_1.TouchParam.deserialize(reader));
                    break;
                case 208:
                    message.start = reader.readString();
                    break;
                case 209:
                    message.stop = reader.readString();
                    break;
                case 210:
                    message.resolution = reader.readBool();
                    break;
                case 211:
                    message.image = reader.readString();
                    break;
                case 212:
                    message.uuid = reader.readBool();
                    break;
                case 213:
                    reader.readMessage(message.set_option, () => message.set_option = CustomControllerSetOptionParam.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomControllerResponse {
        return CustomControllerResponse.deserialize(bytes);
    }
}
