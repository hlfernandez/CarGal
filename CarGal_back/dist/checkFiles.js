"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const dataLoader_1 = __importDefault(require("./dataLoader"));
class FolderChecker {
    constructor(folder) {
        this.watcher = chokidar_1.default.watch(folder, {});
        dataLoader_1.default.instance.setPath(folder);
        this.setWatchers();
    }
    setWatchers() {
        this.watcher
            .on('ready', () => dataLoader_1.default.instance.readFiles())
            .on('add', path => {
            console.log(`File ${path} has been added`);
            dataLoader_1.default.instance.readFiles();
        })
            .on('change', path => {
            console.log(`File ${path} has been changed`);
            dataLoader_1.default.instance.readFiles();
        })
            .on('unlink', path => {
            console.log(`File ${path} has been removed`);
            dataLoader_1.default.instance.readFiles();
        });
    }
}
exports.default = FolderChecker;
