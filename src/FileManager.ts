import FileManager_inter from "./FileManager_inter.js"
import * as fs from "fs";


class FileManager implements FileManager_inter {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    readFile(): string[] {
        let list: string[] = [];

        try {
            const data = fs.readFileSync(this.fileName, "utf-8");
            list = data.split("\n");
        }
        catch (e) {
            console.log("Мэдээлэл татахад алдаа үүслээ!");
        }

        return list;

    }

    writeFile(fileContent: string): void {

        try {
            fs.writeFileSync(this.fileName, fileContent, { flag: "a", encoding: "utf-8" });
            console.log("Data written!");

        } catch (e) {
            console.log("Мэдээлэл бичихэд алдаа үүслээ!");
        }
    }

    clearFileData(): void {
        try {
            fs.writeFileSync(this.fileName, "");
        }
        catch (e) {
            console.log("Файлын системийг цэвэрлэхэд алдаа гарлаа!");
        }
    }
}

export default FileManager;