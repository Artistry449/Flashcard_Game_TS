import App from "./App.js";
import Study from "./Study.js";
import Play from "./Play.js";
import Manage from "./Manage.js";

import inquirer from "./inquirer.js";

class Main {
    apps: App[] = [];

    constructor() {
        this.apps[1] = new Study();
        this.apps[2] = new Play();
        this.apps[3] = new Manage();
    }

    printMenu(): void {
        this.apps.map((el) => console.log(el.getCaption()));
    }
}

let userChoice: number = 0;

const main = new Main();

for (; ;) {
    main.printMenu();


}