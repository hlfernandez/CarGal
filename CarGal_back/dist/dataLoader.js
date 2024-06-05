"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _DataLoader_instance;
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const bd_1 = __importDefault(require("./bd/bd"));
class DataLoader {
    constructor() {
        this.fileNames = [];
        this.path = './data';
        this.DEFAULT_HEADERS = ['fecha', 'nombre', 'url', 'localidad'];
    }
    ;
    setPath(path) {
        this.path = path;
    }
    static get instance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _DataLoader_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(), "f", _DataLoader_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _DataLoader_instance);
    }
    readFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const names = yield promises_1.default.readdir(this.path);
            let finalObject = [];
            for (const name of names) {
                const data = yield promises_1.default.readFile(`${this.path}/${name}`);
                const result = this.parseToJSON(data.toString());
                finalObject = finalObject.concat(result);
            }
            bd_1.default.instance.setBdData(finalObject);
        });
    }
    parseToJSON(csv, separator = ';', fileHeaders = this.DEFAULT_HEADERS) {
        const lines = csv.split('\n');
        const result = [];
        const headers = fileHeaders;
        lines.filter(l => l !== '').map(l => {
            const obj = {};
            const line = l.split(separator);
            headers.map((h, i) => {
                obj[h] = line[i];
            });
            result.push(obj);
        });
        return result;
    }
}
_a = DataLoader;
_DataLoader_instance = { value: void 0 };
exports.default = DataLoader;
