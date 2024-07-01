import chokidar, { FSWatcher } from "chokidar"
import DataLoader from "./dataLoader";

export default class FolderChecker {

    watcher: FSWatcher;
    constructor(folder: string, ignoredFiles?: string[]) {
        this.watcher = chokidar.watch(folder, { ignored: ignoredFiles, ignoreInitial: true })
        DataLoader.instance.setPath(folder);
        DataLoader.instance.setIgnoredFiles(ignoredFiles || []);
        this.setWatchers();
    }


    setWatchers() {
        this.watcher

            .on('ready', () => DataLoader.instance.readFiles())
            .on('add', path => {
                console.log(`File ${path} has been added`);
                DataLoader.instance.readFiles()
            })
            .on('change', path => {
                console.log(`File ${path} has been changed`);
                DataLoader.instance.readFiles()
            })
            .on('unlink', path => {
                console.log(`File ${path} has been removed`);
                DataLoader.instance.readFiles()
            })
    }

}