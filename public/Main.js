import Study from "./Study.js";
import Play from "./Play.js";
import Manage from "./Manage.js";
import inquirer from "./inquirer.js";
class Main {
    apps = [];
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
                message: "Та меню-ээс сонголтоо хийнэ хүү",
                choices
            }
        ]);
        return answer["userMenuChoice"];
    }
    async start() {
        for (;;) {
            let userChoice = await this.getUserChoiceByMenu();
            // console.log("user choice:::", userChoice)
            if (userChoice === this.apps[0].getCaption())
                this.apps[0].start();
            else if (userChoice === this.apps[1].getCaption())
                this.apps[1].start();
            else if (userChoice === this.apps[2].getCaption())
                this.apps[2].start();
            else if (userChoice === "Гарах") {
                console.log("\nBye Bye!\n");
                break;
            }
        }
    }
}
const main = new Main();
main.start();
