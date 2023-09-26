/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: custom.recognizer.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./types";
import * as pb_1 from "google-protobuf";
export class CustomRecognizerRequest extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3]];
    constructor(data?: any[] | ({} & (({
        handle?: string;
    }) | ({
        name?: string;
    }) | ({
        reco_id?: string;
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
            if ("reco_id" in data && data.reco_id != undefined) {
                this.reco_id = data.reco_id;
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
    get reco_id() {
        return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
    }
    set reco_id(value: string) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_reco_id() {
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
    get _reco_id() {
        const cases: {
            [index: number]: "none" | "reco_id";
        } = {
            0: "none",
            3: "reco_id"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    static fromObject(data: {
        handle?: string;
        name?: string;
        reco_id?: string;
    }): CustomRecognizerRequest {
        const message = new CustomRecognizerRequest({});
        if (data.handle != null) {
            message.handle = data.handle;
        }
        if (data.name != null) {
            message.name = data.name;
        }
        if (data.reco_id != null) {
            message.reco_id = data.reco_id;
        }
        return message;
    }
    toObject() {
        const data: {
            handle?: string;
            name?: string;
            reco_id?: string;
        } = {};
        if (this.handle != null) {
            data.handle = this.handle;
        }
        if (this.name != null) {
            data.name = this.name;
        }
        if (this.reco_id != null) {
            data.reco_id = this.reco_id;
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
        if (this.has_reco_id)
            writer.writeString(3, this.reco_id);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomRecognizerRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomRecognizerRequest();
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
                    message.reco_id = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomRecognizerRequest {
        return CustomRecognizerRequest.deserialize(bytes);
    }
}
export class CustomRecognizerAnalyzeParam extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3], [4]];
    constructor(data?: any[] | ({} & (({
        context?: string;
    }) | ({
        image_handle?: string;
    }) | ({
        task?: string;
    }) | ({
        param?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("context" in data && data.context != undefined) {
                this.context = data.context;
            }
            if ("image_handle" in data && data.image_handle != undefined) {
                this.image_handle = data.image_handle;
            }
            if ("task" in data && data.task != undefined) {
                this.task = data.task;
            }
            if ("param" in data && data.param != undefined) {
                this.param = data.param;
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
    get image_handle() {
        return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
    }
    set image_handle(value: string) {
        pb_1.Message.setOneofField(this, 2, this.#one_of_decls[1], value);
    }
    get has_image_handle() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get task() {
        return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
    }
    set task(value: string) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_task() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get param() {
        return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
    }
    set param(value: string) {
        pb_1.Message.setOneofField(this, 4, this.#one_of_decls[3], value);
    }
    get has_param() {
        return pb_1.Message.getField(this, 4) != null;
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
    get _image_handle() {
        const cases: {
            [index: number]: "none" | "image_handle";
        } = {
            0: "none",
            2: "image_handle"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    get _task() {
        const cases: {
            [index: number]: "none" | "task";
        } = {
            0: "none",
            3: "task"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    get _param() {
        const cases: {
            [index: number]: "none" | "param";
        } = {
            0: "none",
            4: "param"
        };
        return cases[pb_1.Message.computeOneofCase(this, [4])];
    }
    static fromObject(data: {
        context?: string;
        image_handle?: string;
        task?: string;
        param?: string;
    }): CustomRecognizerAnalyzeParam {
        const message = new CustomRecognizerAnalyzeParam({});
        if (data.context != null) {
            message.context = data.context;
        }
        if (data.image_handle != null) {
            message.image_handle = data.image_handle;
        }
        if (data.task != null) {
            message.task = data.task;
        }
        if (data.param != null) {
            message.param = data.param;
        }
        return message;
    }
    toObject() {
        const data: {
            context?: string;
            image_handle?: string;
            task?: string;
            param?: string;
        } = {};
        if (this.context != null) {
            data.context = this.context;
        }
        if (this.image_handle != null) {
            data.image_handle = this.image_handle;
        }
        if (this.task != null) {
            data.task = this.task;
        }
        if (this.param != null) {
            data.param = this.param;
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_context)
            writer.writeString(1, this.context);
        if (this.has_image_handle)
            writer.writeString(2, this.image_handle);
        if (this.has_task)
            writer.writeString(3, this.task);
        if (this.has_param)
            writer.writeString(4, this.param);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomRecognizerAnalyzeParam {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomRecognizerAnalyzeParam();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.context = reader.readString();
                    break;
                case 2:
                    message.image_handle = reader.readString();
                    break;
                case 3:
                    message.task = reader.readString();
                    break;
                case 4:
                    message.param = reader.readString();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomRecognizerAnalyzeParam {
        return CustomRecognizerAnalyzeParam.deserialize(bytes);
    }
}
export class CustomRecognizerResponse extends pb_1.Message {
    #one_of_decls: number[][] = [[101], [1], [2]];
    constructor(data?: any[] | ({} & (({
        analyze?: CustomRecognizerAnalyzeParam;
    }) | ({
        reco_id?: string;
    }) | ({
        cmd_id?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("reco_id" in data && data.reco_id != undefined) {
                this.reco_id = data.reco_id;
            }
            if ("cmd_id" in data && data.cmd_id != undefined) {
                this.cmd_id = data.cmd_id;
            }
            if ("analyze" in data && data.analyze != undefined) {
                this.analyze = data.analyze;
            }
        }
    }
    get reco_id() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set reco_id(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[1], value);
    }
    get has_reco_id() {
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
    get analyze() {
        return pb_1.Message.getWrapperField(this, CustomRecognizerAnalyzeParam, 101) as CustomRecognizerAnalyzeParam;
    }
    set analyze(value: CustomRecognizerAnalyzeParam) {
        pb_1.Message.setOneofWrapperField(this, 101, this.#one_of_decls[0], value);
    }
    get has_analyze() {
        return pb_1.Message.getField(this, 101) != null;
    }
    get command() {
        const cases: {
            [index: number]: "none" | "analyze";
        } = {
            0: "none",
            101: "analyze"
        };
        return cases[pb_1.Message.computeOneofCase(this, [101])];
    }
    get _reco_id() {
        const cases: {
            [index: number]: "none" | "reco_id";
        } = {
            0: "none",
            1: "reco_id"
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
        reco_id?: string;
        cmd_id?: string;
        analyze?: ReturnType<typeof CustomRecognizerAnalyzeParam.prototype.toObject>;
    }): CustomRecognizerResponse {
        const message = new CustomRecognizerResponse({});
        if (data.reco_id != null) {
            message.reco_id = data.reco_id;
        }
        if (data.cmd_id != null) {
            message.cmd_id = data.cmd_id;
        }
        if (data.analyze != null) {
            message.analyze = CustomRecognizerAnalyzeParam.fromObject(data.analyze);
        }
        return message;
    }
    toObject() {
        const data: {
            reco_id?: string;
            cmd_id?: string;
            analyze?: ReturnType<typeof CustomRecognizerAnalyzeParam.prototype.toObject>;
        } = {};
        if (this.reco_id != null) {
            data.reco_id = this.reco_id;
        }
        if (this.cmd_id != null) {
            data.cmd_id = this.cmd_id;
        }
        if (this.analyze != null) {
            data.analyze = this.analyze.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_reco_id)
            writer.writeString(1, this.reco_id);
        if (this.has_cmd_id)
            writer.writeString(2, this.cmd_id);
        if (this.has_analyze)
            writer.writeMessage(101, this.analyze, () => this.analyze.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomRecognizerResponse {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomRecognizerResponse();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.reco_id = reader.readString();
                    break;
                case 2:
                    message.cmd_id = reader.readString();
                    break;
                case 101:
                    reader.readMessage(message.analyze, () => message.analyze = CustomRecognizerAnalyzeParam.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): CustomRecognizerResponse {
        return CustomRecognizerResponse.deserialize(bytes);
    }
}
export class CustomRecognizerAnalyzeResult extends pb_1.Message {
    #one_of_decls: number[][] = [[1], [2], [3]];
    constructor(data?: any[] | ({} & (({
        match?: boolean;
    }) | ({
        box?: dependency_1.Rect;
    }) | ({
        detail?: string;
    })))) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("match" in data && data.match != undefined) {
                this.match = data.match;
            }
            if ("box" in data && data.box != undefined) {
                this.box = data.box;
            }
            if ("detail" in data && data.detail != undefined) {
                this.detail = data.detail;
            }
        }
    }
    get match() {
        return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
    }
    set match(value: boolean) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_match() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get box() {
        return pb_1.Message.getWrapperField(this, dependency_1.Rect, 2) as dependency_1.Rect;
    }
    set box(value: dependency_1.Rect) {
        pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[1], value);
    }
    get has_box() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get detail() {
        return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
    }
    set detail(value: string) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[2], value);
    }
    get has_detail() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get _match() {
        const cases: {
            [index: number]: "none" | "match";
        } = {
            0: "none",
            1: "match"
        };
        return cases[pb_1.Message.computeOneofCase(this, [1])];
    }
    get _box() {
        const cases: {
            [index: number]: "none" | "box";
        } = {
            0: "none",
            2: "box"
        };
        return cases[pb_1.Message.computeOneofCase(this, [2])];
    }
    get _detail() {
        const cases: {
            [index: number]: "none" | "detail";
        } = {
            0: "none",
            3: "detail"
        };
        return cases[pb_1.Message.computeOneofCase(this, [3])];
    }
    static fromObject(data: {
        match?: boolean;
        box?: ReturnType<typeof dependency_1.Rect.prototype.toObject>;
        detail?: string;
    }): CustomRecognizerAnalyzeResult {
        const message = new CustomRecognizerAnalyzeResult({});
        if (data.match != null) {
            message.match = data.match;
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
            match?: boolean;
            box?: ReturnType<typeof dependency_1.Rect.prototype.toObject>;
            detail?: string;
        } = {};
        if (this.match != null) {
            data.match = this.match;
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
        if (this.has_match)
            writer.writeBool(1, this.match);
        if (this.has_box)
            writer.writeMessage(2, this.box, () => this.box.serialize(writer));
        if (this.has_detail)
            writer.writeString(3, this.detail);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CustomRecognizerAnalyzeResult {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomRecognizerAnalyzeResult();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.match = reader.readBool();
                    break;
                case 2:
                    reader.readMessage(message.box, () => message.box = dependency_1.Rect.deserialize(reader));
                    break;
                case 3:
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
    static deserializeBinary(bytes: Uint8Array): CustomRecognizerAnalyzeResult {
        return CustomRecognizerAnalyzeResult.deserialize(bytes);
    }
}
export class SubmitCustomRecognizerRequest extends pb_1.Message {
    #one_of_decls: number[][] = [[101], [1], [2], [3]];
    constructor(data?: any[] | ({} & (({
        analyze?: CustomRecognizerAnalyzeResult;
    }) | ({
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
            if ("analyze" in data && data.analyze != undefined) {
                this.analyze = data.analyze;
            }
        }
    }
    get handle() {
        return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set handle(value: string) {
        pb_1.Message.setOneofField(this, 1, this.#one_of_decls[1], value);
    }
    get has_handle() {
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
    get ok() {
        return pb_1.Message.getFieldWithDefault(this, 3, false) as boolean;
    }
    set ok(value: boolean) {
        pb_1.Message.setOneofField(this, 3, this.#one_of_decls[3], value);
    }
    get has_ok() {
        return pb_1.Message.getField(this, 3) != null;
    }
    get analyze() {
        return pb_1.Message.getWrapperField(this, CustomRecognizerAnalyzeResult, 101) as CustomRecognizerAnalyzeResult;
    }
    set analyze(value: CustomRecognizerAnalyzeResult) {
        pb_1.Message.setOneofWrapperField(this, 101, this.#one_of_decls[0], value);
    }
    get has_analyze() {
        return pb_1.Message.getField(this, 101) != null;
    }
    get result() {
        const cases: {
            [index: number]: "none" | "analyze";
        } = {
            0: "none",
            101: "analyze"
        };
        return cases[pb_1.Message.computeOneofCase(this, [101])];
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
        analyze?: ReturnType<typeof CustomRecognizerAnalyzeResult.prototype.toObject>;
    }): SubmitCustomRecognizerRequest {
        const message = new SubmitCustomRecognizerRequest({});
        if (data.handle != null) {
            message.handle = data.handle;
        }
        if (data.cmd_id != null) {
            message.cmd_id = data.cmd_id;
        }
        if (data.ok != null) {
            message.ok = data.ok;
        }
        if (data.analyze != null) {
            message.analyze = CustomRecognizerAnalyzeResult.fromObject(data.analyze);
        }
        return message;
    }
    toObject() {
        const data: {
            handle?: string;
            cmd_id?: string;
            ok?: boolean;
            analyze?: ReturnType<typeof CustomRecognizerAnalyzeResult.prototype.toObject>;
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
        if (this.analyze != null) {
            data.analyze = this.analyze.toObject();
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
        if (this.has_analyze)
            writer.writeMessage(101, this.analyze, () => this.analyze.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SubmitCustomRecognizerRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SubmitCustomRecognizerRequest();
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
                case 101:
                    reader.readMessage(message.analyze, () => message.analyze = CustomRecognizerAnalyzeResult.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): SubmitCustomRecognizerRequest {
        return SubmitCustomRecognizerRequest.deserialize(bytes);
    }
}
