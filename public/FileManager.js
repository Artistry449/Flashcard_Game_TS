import * as fs from "fs";
class FileManager {
    fileName;
    constructor(fileName) {
        this.fileName = fileName;
    }
    readFile() {
        let list = [];
        try {
            const data = fs.readFileSync(this.fileName, "utf-8");
            list = data.split("\n");
        }
        catch (e) {
            console.log("Мэдээлэл татахад алдаа үүслээ!");
        }
        return list;
    }
    writeFile(fileContent) {
        try {
            fs.writeFileSync(this.fileName, fileContent, { flag: "a", encoding: "utf-8" });
            console.log("Data written!");
        }
        catch (e) {
            console.log("Мэдээлэл бичихэд алдаа үүслээ!");
        }
    }
    clearFileData() {
        try {
            fs.writeFileSync(this.fileName, "");
        }
        catch (e) {
            console.log("Файлын системийг цэвэрлэхэд алдаа гарлаа!");
        }
    }
}
export default FileManager;
