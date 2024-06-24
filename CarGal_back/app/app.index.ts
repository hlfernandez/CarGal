import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import RacesController from "./api/races/races.controller";
import FolderChecker from "./folderChecker";
import fs from "node:fs/promises";
import cors from "cors";
import axios from 'axios';
import { JSDOM } from 'jsdom';
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));
const port = process.env.PORT || 3000;
const serverMode = process.env.SERVER_MODE || 'LOCAL';
const dataURL = process.env.URL_FILE_WITH_FILENAMES || '';
const HOME = process.env.HOME || '';
const dataRoute: string =
  ((process.env.SERVER_MODE === 'REMOTE' ? process.env.CSV_FOLDER_REMOTE : process.env.CSV_FOLDER) || '')
  .replace('${HOME}', HOME);
const serverFilesModificationData = new Map<string, Date>();
const update_interval = parseInt(process.env.REMOTE_UPDATE_INTERVAL as string) || 43200000;

console.log(dataURL);
if (serverMode === 'REMOTE') {
  const allowedFileExtensions = process.env.FILE_EXTENSIONS || '.csv';
  // const searchExtensionFilesToDownload = allowedFileExtensions.split(' ');
  const baseUrl = process.env.URL_BASE_DOWNLOAD || '';

  (async () => {
    const namesToDelete = await fs.readdir(dataRoute)
    for await (const name of namesToDelete) {
      await fs.unlink(`${dataRoute}/${name}`)
    }

    const urlFileNames = await getFileNamesFromURL(dataURL);
    await compareRemoteToLocalFiles(serverFilesModificationData, urlFileNames, baseUrl);

    setInterval(async () => {
      console.log(`Actualización realizada el ${new Date()}`)
      const urlFileNames = await getFileNamesFromURL(dataURL);
      await compareRemoteToLocalFiles(serverFilesModificationData, urlFileNames, baseUrl);
      await removeDeletedFiles(urlFileNames, serverFilesModificationData);
    }, update_interval)
  })()
}
(async () => {
  try {
    await fs.access(dataRoute);
    const isDirectory = (await fs.lstat(dataRoute)).isDirectory()
    if (isDirectory) {
      new FolderChecker(dataRoute)
    }
  } catch (error) {
    throw new Error('No existe el fichero especificado')
  }
})();



const racesController = new RacesController()

app.get("/races", racesController.findAll);


app.get("/", (req: Request, res: Response) => {
  res.send("It works");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


async function downloadFile(name: string, url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await fs.writeFile(`${dataRoute}/${name}`, Buffer.from(response.data, 'binary'));
}

async function getFileNamesFromURL(url: string): Promise<string[]> {
  const resp = await axios.get(url);
  const { document } = new JSDOM(resp.data).window
  const elements = document.body.textContent || '';
  return elements.split('\n').filter(e => !!e);
}


async function compareRemoteToLocalFiles(lastUpdateMap: Map<string, Date>, urlFileNames: string[], baseUrl: string): Promise<void> {
  for await (const fileName of urlFileNames) {
    const response = await axios.get(`${baseUrl}/${fileName}`);
    const fileExist = lastUpdateMap.has(fileName)
    // @ts-ignore: Object is possibly 'null'.
    const fileIsOldVersion = fileExist && (lastUpdateMap.get(fileName) < new Date(response.headers['last-modified']))

    if (!fileExist || fileIsOldVersion) {
      if (!fileExist) {
        console.log(`Descargando ${fileName}. No existe el fichero en local`)
      }
      if (fileIsOldVersion) {
        console.log(`Descargando ${fileName}. La versión online es mas actual que la local`)
      }
      await downloadFile(fileName, `${baseUrl}/${fileName}`)
      lastUpdateMap.set(fileName, new Date(response.headers['last-modified']));
    } else {
      console.log(`El fichero ${fileName} ya existe en local en su version mas recient`)
    }


  }
}

async function removeDeletedFiles(urlFileNames: string[], lastUpdateMap: Map<string, Date>): Promise<void> {
  const namesInFolder = await fs.readdir(dataRoute)
  for await (const name of namesInFolder) {
    if (!urlFileNames.includes(name)) {
      console.log(`Borrando el fichero ${name}. Ya no existe en la url proporcionada`)
      lastUpdateMap.delete(name)
      await fs.unlink(`${dataRoute}/${name}`)
    }
  }
}


