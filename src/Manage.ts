import App from "./App.js";

class Manage implements App {
    caption: string;

    constructor() {
        this.caption = "Цуглуулгыг өөрчлөх!";
    }

    getCaption(): String {
        return this.caption;
    }
    printMenu(): void {

    }
    start(): void {

    }

}

export default Manage;