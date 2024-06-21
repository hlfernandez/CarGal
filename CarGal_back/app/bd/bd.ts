import Races from "../shared/models/races.model";


export default class Bd {

    static #instance: Bd;
    private filesInfoData: Map<string, Date> = new Map();
    private storedData!: Races[];

    private constructor() { }

    public static get instance(): Bd {
        if (!Bd.#instance) {
            Bd.#instance = new Bd();
        }

        return Bd.#instance;
    }

    getBdData(): Races[] {
        return this.storedData;
    }

    setBdData(data: Races[]) {
        this.storedData = data;
    }

    getFilesInfo() {
        return this.filesInfoData;
    }

    setFilesInfo(data: any) {
        this.filesInfoData = data;
    }

}