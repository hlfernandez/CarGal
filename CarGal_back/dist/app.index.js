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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const races_controller_1 = __importDefault(require("./api/races/races.controller"));
const checkFiles_1 = __importDefault(require("./checkFiles"));
const promises_1 = __importDefault(require("node:fs/promises"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
const dataRoute = process.env.CSV_FOLDER || './data';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.access(dataRoute);
        const isDirectory = (yield promises_1.default.lstat(dataRoute)).isDirectory();
        if (isDirectory) {
            new checkFiles_1.default(dataRoute);
        }
    }
    catch (error) {
        throw new Error('No existe el fichero especificado');
    }
}))();
const racesController = new races_controller_1.default();
app.get("/races", racesController.findAll);
app.get("/", (req, res) => {
    res.send("It works");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
