import FileOrigins from "../shared/models/file-origin.model";
import Races from "../shared/models/races.model";


export default class Bd {

    static #instance: Bd;
    private _filesInfoData: Map<string, Date> = new Map();
    private _storedData!: Races[];
    private _eventFilesNamesMapOrigin!: FileOrigins[];

    private constructor() { }

    public static get instance(): Bd {
        if (!Bd.#instance) {
            Bd.#instance = new Bd();
        }

        return Bd.#instance;
    }

    get storedData(): Races[] {
        return this._storedData;
    }

    set storedData(data: Races[]) {
        this._storedData = data;
    }

    get filesInfoData() {
        return this._filesInfoData;
    }

    set filesInfoData(data: any) {
        this._filesInfoData = data;
    }

    get eventFilesNamesMapOrigin(): FileOrigins[] {
        return this._eventFilesNamesMapOrigin;
    }

    set eventFilesNamesMapOrigin(data: FileOrigins[]) {
        this._eventFilesNamesMapOrigin = data;
    }


}