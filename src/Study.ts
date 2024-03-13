import App from "./App.js";

class Study implements App {
    private caption: string;

    constructor() {
        this.caption = "Суралцах!";
    }

    getCaption(): String {
        return this.caption;
    }
    printMenu(): void {

    }
    start(): void {

    }

}

export default Study;