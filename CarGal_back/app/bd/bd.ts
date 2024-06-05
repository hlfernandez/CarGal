export default class Bd {

    static #instance: Bd;
    private storedData: any;

    private constructor() { }

    public static get instance(): Bd {
        if (!Bd.#instance) {
            Bd.#instance = new Bd();
        }

        return Bd.#instance;
    }

    getBdData() {
        return this.storedData;
    }

    setBdData(data: any) {
        this.storedData = data;
    }

}