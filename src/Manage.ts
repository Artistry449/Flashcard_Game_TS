import App from "./App.js";

class Manage implements App {
    private caption: string;

    constructor() {
        this.caption = "Цуглуулгыг өөрчлөх!";
    }

    getCaption(): string {
        return this.caption;
    }
    printMenu(): void {

    }
    start(): void {

    }

}

export default Manage;