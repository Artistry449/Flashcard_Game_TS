interface FileManager_inter {
    readFile(): string[];

    writeFile(fileContent: string): void;

    clearFileData(): void;
}

export default FileManager_inter;