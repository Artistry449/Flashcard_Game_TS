import App from "./App.js";

class Study implements App {
    private caption: string;

    constructor() {
        this.caption = "Суралцах!";
    }

    getCaption(): string {
        return this.caption;
    }
    printMenu(): void {

    }
    start(): void {
        console.log("Суралцах руу ороод ирлээ хө!")
    }

}

export default Study;