import App from "./App.js";

class Play implements App {
    private caption: string;

    constructor() {
        this.caption = "Тоглох!";
    }

    getCaption(): string {
        return this.caption;
    }
    printMenu(): void {

    }
    start(): void {

    }
}

export default Play;