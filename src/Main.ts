import App from "./App.js";
import Study from "./Study.js";
import Play from "./Play.js";
import Manage from "./Manage.js";

import inquirer from "./inquirer.js";

class Main {
    apps: App[] = [];

    constructor() {
        this.apps[0] = new Study();
        this.apps[1] = new Play();
        this.apps[2] = new Manage();
    }

    async getUserChoiceByMenu() {
        const choices = this.apps.map((app) => app.getCaption());
        choices.push("Гарах");

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                message: "Та меню-ээс сонголтоо хийнэ үү",
                choices
            }
        ]);

        return answer["userMenuChoice"];
    }

    async start() {
        for (; ;) {
            console.clear();
            let userChoice = await this.getUserChoiceByMenu();

            // console.log("user choice:::", userChoice)

            if (userChoice === this.apps[0].getCaption()) await this.apps[0].start();

            else if (userChoice === this.apps[1].getCaption()) await this.apps[1].start();

            else if (userChoice === this.apps[2].getCaption()) await this.apps[2].start();

            else if (userChoice === "Гарах") {
                console.log("\nBye Bye!\n")
                break;
            }
        }

    }
}

const main = new Main();
main.start();
