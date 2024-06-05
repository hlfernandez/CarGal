import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import RacesController from "./api/races/races.controller";
import checkFiles from "./checkFiles";
import fs from "node:fs/promises";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));
const port = process.env.PORT || 3000;
const dataRoute = process.env.CSV_FOLDER || './data';

(async () => {
  try {
    await fs.access(dataRoute);
    const isDirectory = (await fs.lstat(dataRoute)).isDirectory()
    if (isDirectory) {
      new checkFiles(dataRoute)
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