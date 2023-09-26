/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: custom.action.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./types";
import * as pb_1 from "google-protobuf";
export class CustomActionInit extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3]];
    constructor(data?: any[] | ({} & (({
        handle?: string;
    }) | ({
        name?: string;
    }) | ({
        act_id?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("handle" in data && data.handle != undefined) {
                this.handle = data.handle;
            }
            if ("name" in data && data.name != undefined) {
                this.name = data.name;
            }
            if ("act_id" in data && data.act_id != undefined) {
                this.act_id = data.act_id;
            }
        }
    }
    get handle() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set handle(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_handle() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get name() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set name(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[1], value);
    }
    get has_name() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get act_id() {
        return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
    }
    set act_id(value: string) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_act_id() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get _handle() {
        const cases: {
            [index: number]: "none" | "handle";
        } = {
            0: "none",
            1: "handle"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _name() {
        const cases: {
            [index: number]: "none" | "name";
        } = {
            0: "none",
            2: "name"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    get _act_id() {
        const cases: {
            [index: number]: "none" | "act_id";
        } = {
            0: "none",
            3: "act_id"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    static fromObject(data: {
        handle?: string;
        name?: string;
        act_id?: string;
    }): CustomActionInit {
        const message = new CustomActionInit({});
        if (data.handle != null) {
            message.handle = data.handle;
        }
        if (data.name != null) {
            message.name = data.name;
        }
        if (data.act_id != null) {
            message.act_id = data.act_id;
        }
        return message;
    }
    toObject() {
        const data: {
            handle?: string;
            name?: string;
            act_id?: string;
        } = {};
        if (this.handle != null) {
            data.handle = this.handle;
        }
        if (this.name != null) {
            data.name = this.name;
        }
        if (this.act_id != null) {
            data.act_id = this.act_id;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_handle)
            writer.writeString(1, this.handle);
        if (this.has_name)
            writer.writeString(2, this.name);
        if (this.has_act_id)
            writer.writeString(3, this.act_id);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomActionInit {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomActionInit();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.handle = reader.readString();
                    break;
                case 2:
                    message.name = reader.readString();
                    break;
                case 3:
                    message.act_id = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomActionInit {
        return CustomActionInit.deserialize(bytes);
    }
}
export class CustomActionSubmit extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3]];
    constructor(data?: any[] | ({} & (({
        handle?: string;
    }) | ({
        cmd_id?: string;
    }) | ({
        ok?: boolean;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("handle" in data && data.handle != undefined) {
                this.handle = data.handle;
            }
            if ("cmd_id" in data && data.cmd_id != undefined) {
                this.cmd_id = data.cmd_id;
            }
            if ("ok" in data && data.ok != undefined) {
                this.ok = data.ok;
            }
        }
    }
    get handle() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set handle(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_handle() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get cmd_id() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set cmd_id(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[1], value);
    }
    get has_cmd_id() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get ok() {
        return pb_1.Message.getFieldWithDefault(this, 3, false) as boolean;
    }
    set ok(value: boolean) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_ok() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get _handle() {
        const cases: {
            [index: number]: "none" | "handle";
        } = {
            0: "none",
            1: "handle"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _cmd_id() {
        const cases: {
            [index: number]: "none" | "cmd_id";
        } = {
            0: "none",
            2: "cmd_id"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    get _ok() {
        const cases: {
            [index: number]: "none" | "ok";
        } = {
            0: "none",
            3: "ok"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    static fromObject(data: {
        handle?: string;
        cmd_id?: string;
        ok?: boolean;
    }): CustomActionSubmit {
        const message = new CustomActionSubmit({});
        if (data.handle != null) {
            message.handle = data.handle;
        }
        if (data.cmd_id != null) {
            message.cmd_id = data.cmd_id;
        }
        if (data.ok != null) {
            message.ok = data.ok;
        }
        return message;
    }
    toObject() {
        const data: {
            handle?: string;
            cmd_id?: string;
            ok?: boolean;
        } = {};
        if (this.handle != null) {
            data.handle = this.handle;
        }
        if (this.cmd_id != null) {
            data.cmd_id = this.cmd_id;
        }
        if (this.ok != null) {
            data.ok = this.ok;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_handle)
            writer.writeString(1, this.handle);
        if (this.has_cmd_id)
            writer.writeString(2, this.cmd_id);
        if (this.has_ok)
            writer.writeBool(3, this.ok);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomActionSubmit {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomActionSubmit();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.handle = reader.readString();
                    break;
                case 2:
                    message.cmd_id = reader.readString();
                    break;
                case 3:
                    message.ok = reader.readBool();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomActionSubmit {
        return CustomActionSubmit.deserialize(bytes);
    }
}
export class CustomActionRequest extends pb_1.Message {
    #one_of_decls: number[][] = [[1, 2]];
    constructor(data?: any[] | ({} & (({
        init?: CustomActionInit;
        submit?: never;
    } | {
        init?: never;
        submit?: CustomActionSubmit;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("init" in data && data.init != undefined) {
                this.init = data.init;
            }
            if ("submit" in data && data.submit != undefined) {
                this.submit = data.submit;
            }
        }
    }
    get init() {
        return pb_1.Message.getWrapperField(this, CustomActionInit, 1) as CustomActionInit;
    }
    set init(value: CustomActionInit) {
        pb_1.Message.setOneofWrapperField(this, 1, this.#one_of_decls[0], value);
    }
    get has_init() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get submit() {
        return pb_1.Message.getWrapperField(this, CustomActionSubmit, 2) as CustomActionSubmit;
    }
    set submit(value: CustomActionSubmit) {
        pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[0], value);
    }
    get has_submit() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get payload() {
        const cases: {
            [index: number]: "none" | "init" | "submit";
        } = {
            0: "none",
            1: "init",
            2: "submit"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
    }
    static fromObject(data: {
        init?: ReturnType<typeof CustomActionInit.prototype.toObject>;
        submit?: ReturnType<typeof CustomActionSubmit.prototype.toObject>;
    }): CustomActionRequest {
        const message = new CustomActionRequest({});
        if (data.init != null) {
            message.init = CustomActionInit.fromObject(data.init);
        }
        if (data.submit != null) {
            message.submit = CustomActionSubmit.fromObject(data.submit);
        }
        return message;
    }
    toObject() {
        const data: {
            init?: ReturnType<typeof CustomActionInit.prototype.toObject>;
            submit?: ReturnType<typeof CustomActionSubmit.prototype.toObject>;
        } = {};
        if (this.init != null) {
            data.init = this.init.toObject();
        }
        if (this.submit != null) {
            data.submit = this.submit.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_init)
            writer.writeMessage(1, this.init, () => this.init.serialize(writer));
        if (this.has_submit)
            writer.writeMessage(2, this.submit, () => this.submit.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomActionRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomActionRequest();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    reader.readMessage(message.init, () => message.init = CustomActionInit.deserialize(reader));
                    break;
                case 2:
                    reader.readMessage(message.submit, () => message.submit = CustomActionSubmit.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomActionRequest {
        return CustomActionRequest.deserialize(bytes);
    }
}
export class CustomActionRunParam extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3], [4], [5]];
    constructor(data?: any[] | ({} & (({
        context?: string;
    }) | ({
        task?: string;
    }) | ({
        param?: string;
    }) | ({
        box?: dependency_1.Rect;
    }) | ({
        detail?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("context" in data && data.context != undefined) {
                this.context = data.context;
            }
            if ("task" in data && data.task != undefined) {
                this.task = data.task;
            }
            if ("param" in data && data.param != undefined) {
                this.param = data.param;
            }
            if ("box" in data && data.box != undefined) {
                this.box = data.box;
            }
            if ("detail" in data && data.detail != undefined) {
                this.detail = data.detail;
            }
        }
    }
    get context() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set context(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_context() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get task() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set task(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[1], value);
    }
    get has_task() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get param() {
        return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
    }
    set param(value: string) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_param() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get box() {
        return pb_1.Message.getWrapperField(this, dependency_1.Rect, 4) as dependency_1.Rect;
    }
    set box(value: dependency_1.Rect) {
        pb_1.Message.setOneofWrapperField(this, 4, this.#one_of_decls[3], value);
    }
    get has_box() {
        return pb_1.Message.getField(this, 4) != null;
    }
    get detail() {
        return pb_1.Message.getFieldWithDefault(this, 5, "") as string;
    }
    set detail(value: string) {
        pb_1.Message.setOneofField(this, 5, this.#one_of_decls[4], value);
    }
    get has_detail() {
        return pb_1.Message.getField(this, 5) != null;
    }
    get _context() {
        const cases: {
            [index: number]: "none" | "context";
        } = {
            0: "none",
            1: "context"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _task() {
        const cases: {
            [index: number]: "none" | "task";
        } = {
            0: "none",
            2: "task"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    get _param() {
        const cases: {
            [index: number]: "none" | "param";
        } = {
            0: "none",
            3: "param"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    get _box() {
        const cases: {
            [index: number]: "none" | "box";
        } = {
            0: "none",
            4: "box"
        };
        return cases[pb_1.Message.computeOneofCase(this, [4])];
    }
    get _detail() {
        const cases: {
            [index: number]: "none" | "detail";
        } = {
            0: "none",
            5: "detail"
        };
        return cases[pb_1.Message.computeOneofCase(this, [5])];
    }
    static fromObject(data: {
        context?: string;
        task?: string;
        param?: string;
        box?: ReturnType<typeof dependency_1.Rect.prototype.toObject>;
        detail?: string;
    }): CustomActionRunParam {
        const message = new CustomActionRunParam({});
        if (data.context != null) {
            message.context = data.context;
        }
        if (data.task != null) {
            message.task = data.task;
        }
        if (data.param != null) {
            message.param = data.param;
        }
        if (data.box != null) {
            message.box = dependency_1.Rect.fromObject(data.box);
        }
        if (data.detail != null) {
            message.detail = data.detail;
        }
        return message;
    }
    toObject() {
        const data: {
            context?: string;
            task?: string;
            param?: string;
            box?: ReturnType<typeof dependency_1.Rect.prototype.toObject>;
            detail?: string;
        } = {};
        if (this.context != null) {
            data.context = this.context;
        }
        if (this.task != null) {
            data.task = this.task;
        }
        if (this.param != null) {
            data.param = this.param;
        }
        if (this.box != null) {
            data.box = this.box.toObject();
        }
        if (this.detail != null) {
            data.detail = this.detail;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_context)
            writer.writeString(1, this.context);
        if (this.has_task)
            writer.writeString(2, this.task);
        if (this.has_param)
            writer.writeString(3, this.param);
        if (this.has_box)
            writer.writeMessage(4, this.box, () => this.box.serialize(writer));
        if (this.has_detail)
            writer.writeString(5, this.detail);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomActionRunParam {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomActionRunParam();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.context = reader.readString();
                    break;
                case 2:
                    message.task = reader.readString();
                    break;
                case 3:
                    message.param = reader.readString();
                    break;
                case 4:
                    reader.readMessage(message.box, () => message.box = dependency_1.Rect.deserialize(reader));
                    break;
                case 5:
                    message.detail = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomActionRunParam {
        return CustomActionRunParam.deserialize(bytes);
    }
}
export class CustomActionResponse extends pb_1.Message {
    #one_of_decls: number[][] = [[101, 102], [1], [2]];
    constructor(data?: any[] | ({} & (({
        run?: CustomActionRunParam;
        stop?: never;
    } | {
        run?: never;
        stop?: boolean;
    }) | ({
        act_id?: string;
    }) | ({
        cmd_id?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("act_id" in data && data.act_id != undefined) {
                this.act_id = data.act_id;
            }
            if ("cmd_id" in data && data.cmd_id != undefined) {
                this.cmd_id = data.cmd_id;
            }
            if ("run" in data && data.run != undefined) {
                this.run = data.run;
            }
            if ("stop" in data && data.stop != undefined) {
                this.stop = data.stop;
            }
        }
    }
    get act_id() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set act_id(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[1], value);
    }
    get has_act_id() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get cmd_id() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set cmd_id(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[2], value);
    }
    get has_cmd_id() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get run() {
        return pb_1.Message.getWrapperField(this, CustomActionRunParam, 101) as CustomActionRunParam;
    }
    set run(value: CustomActionRunParam) {
        pb_1.Message.setOneofWrapperField(this, 101, this.#one_of_decls[0], value);
    }
    get has_run() {
        return pb_1.Message.getField(this, 101) != null;
    }
    get stop() {
        return pb_1.Message.getFieldWithDefault(this, 102, false) as boolean;
    }
    set stop(value: boolean) {
        pb_1.Message.setOneofField(this, 102, this.#one_of_decls[0], value);
    }
    get has_stop() {
        return pb_1.Message.getField(this, 102) != null;
    }
    get command() {
        const cases: {
            [index: number]: "none" | "run" | "stop";
        } = {
            0: "none",
            101: "run",
            102: "stop"
        };
        return cases[pb_1.Message.computeOneofCase(this, [101, 102])];
    }
    get _act_id() {
        const cases: {
            [index: number]: "none" | "act_id";
        } = {
            0: "none",
            1: "act_id"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _cmd_id() {
        const cases: {
            [index: number]: "none" | "cmd_id";
        } = {
            0: "none",
            2: "cmd_id"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    static fromObject(data: {
        act_id?: string;
        cmd_id?: string;
        run?: ReturnType<typeof CustomActionRunParam.prototype.toObject>;
        stop?: boolean;
    }): CustomActionResponse {
        const message = new CustomActionResponse({});
        if (data.act_id != null) {
            message.act_id = data.act_id;
        }
        if (data.cmd_id != null) {
            message.cmd_id = data.cmd_id;
        }
        if (data.run != null) {
            message.run = CustomActionRunParam.fromObject(data.run);
        }
        if (data.stop != null) {
            message.stop = data.stop;
        }
        return message;
    }
    toObject() {
        const data: {
            act_id?: string;
            cmd_id?: string;
            run?: ReturnType<typeof CustomActionRunParam.prototype.toObject>;
            stop?: boolean;
        } = {};
        if (this.act_id != null) {
            data.act_id = this.act_id;
        }
        if (this.cmd_id != null) {
            data.cmd_id = this.cmd_id;
        }
        if (this.run != null) {
            data.run = this.run.toObject();
        }
        if (this.stop != null) {
            data.stop = this.stop;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_act_id)
            writer.writeString(1, this.act_id);
        if (this.has_cmd_id)
            writer.writeString(2, this.cmd_id);
        if (this.has_run)
            writer.writeMessage(101, this.run, () => this.run.serialize(writer));
        if (this.has_stop)
            writer.writeBool(102, this.stop);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomActionResponse {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomActionResponse();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.act_id = reader.readString();
                    break;
                case 2:
                    message.cmd_id = reader.readString();
                    break;
                case 101:
                    reader.readMessage(message.run, () => message.run = CustomActionRunParam.deserialize(reader));
                    break;
                case 102:
                    message.stop = reader.readBool();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomActionResponse {
        return CustomActionResponse.deserialize(bytes);
    }
}
