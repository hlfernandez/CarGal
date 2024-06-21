import fs from "node:fs/promises";
import Bd from "./bd/bd";
import Races from "./shared/models/races.model"


export default class DataLoader {
    static #instance: DataLoader;
    fileNames: string[] = [];
    path = './data';

    DEFAULT_HEADERS = ['fecha', 'nombre', 'url', 'localidad']

    private constructor() { };

    public setPath(path: string) {
        this.path = path;
    }

    public static get instance(): DataLoader {
        if (!DataLoader.#instance) {
            DataLoader.#instance = new DataLoader();
        }
        return DataLoader.#instance;
    }

    public async readFiles() {
        const names = await fs.readdir(this.path)
        let finalObject: any = []
        for (const name of names) {
            const data = await fs.readFile(`${this.path}/${name}`)
            const result = this.parseToJSON(data.toString(), name)
            finalObject = finalObject.concat(result)
        }
        Bd.instance.setBdData(finalObject)

    }

    private parseToJSON(csv: string, fileName: string, separator: string = ';', fileHeaders: string[] = this.DEFAULT_HEADERS): Races[] {
        const lines = csv.split('\n')

        const result: any = []
        const headers = fileHeaders;

        lines.filter(l => l !== '').map(l => {
            const obj: any = {}
            const line = l.split(separator)

            headers.map((h: string, i: number) => {
                obj[h] = line[i]
            })
            obj['origen'] = fileName;

            result.push(obj)
        })
        return result;
    }

}