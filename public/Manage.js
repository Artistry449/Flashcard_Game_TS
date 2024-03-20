import inquirer from "./inquirer.js";
import DeckOrgaizer from "./DeckOrganizer.js";
import InquirerMethod from "./InquirerMethod.js";
class Manage {
    caption;
    deckOrganizer = new DeckOrgaizer();
    constructor() {
        this.caption = "Цуглуулгыг өөрчлөх!";
    }
    getCaption() {
        return this.caption;
    }
    async printMenu() {
        // 1. Ширээний нэр өөрчлөх
        // 1. Ширээ устгах
        // 2. Картны асуулт өөрчлөх
        // 2. Картны хариулт өөрчлөх
        // 2. Карт устгах
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                message: "Та юу хийхийг хүсэж байна вэ?",
                choices: ["Ширээний нэр өөрчлөх", "Ширээ устгах", "Картны асуулт өөрчлөх", "Картны хариулт өөрчлөх", "Карт устгах", "<<Буцах"]
            }
        ]);
        return answer.userMenuChoice;
    }
    async printDecks() {
        const choices = this.deckOrganizer.getAllDecks().map(el => el.getName());
        choices.push("Шинэ ширээ нэмэх");
        choices.push("<<Буцах");
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "Та аль ширээг сонгох вэ?",
                // message: "Та меню-ээс сонголтоо хийнэ үү",
                choices: choices
            }
        ]);
        return answer["Та аль ширээг сонгох вэ?"];
    }
    async printDeckCardMenu(deckName) {
        const choices = this.deckOrganizer.getDeck(deckName).getCards().map((el) => el.getQuestion());
        choices.push("<<Буцах");
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                message: "Та аль картыг сонгох вэ?",
                choices
            }
        ]);
        return answer["userMenuChoice"];
    }
    async start() {
        console.clear();
        for (;;) {
            let userChoice = await this.printMenu();
            if (userChoice === "<<Буцах")
                break;
            else if (userChoice === "Ширээний нэр өөрчлөх") {
                let deck = await this.printDecks();
                const prompt = new InquirerMethod("input", "Шинэ нэр:");
                if (this.deckOrganizer.getDeck(deck))
                    this.deckOrganizer.getDeck(deck).editName(await prompt.prompt("Шинэ нэр:"));
            }
            else if (userChoice === "Ширээ устгах") {
                let deck = await this.printDecks();
                if (deck !== "<<Буцах")
                    this.deckOrganizer.deleteDeck(deck);
            }
            else if (userChoice === "Картны асуулт өөрчлөх") {
                let deck = await this.printDecks();
                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);
                    const prompt = new InquirerMethod("input", "Шинэ асуулт:");
                    if (card !== "Буцах")
                        this.deckOrganizer.getDeck(deck).getCard(this.deckOrganizer.getDeck(deck).findCard(card)).editQuestion(await prompt.prompt("Шинэ асуулт:"));
                }
            }
            else if (userChoice === "Картны хариулт өөрчлөх") {
                let deck = await this.printDecks();
                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);
                    const prompt = new InquirerMethod("input", "Шинэ хариулт:");
                    if (card !== "Буцах")
                        this.deckOrganizer.getDeck(deck).getCard(this.deckOrganizer.getDeck(deck).findCard(card)).editAnswer(await prompt.prompt("Шинэ хариулт:"));
                }
            }
            else if (userChoice === "Карт устгах") {
                let deck = await this.printDecks();
                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);
                    if (card !== "Буцах")
                        this.deckOrganizer.getDeck(deck).deleteCard(this.deckOrganizer.getDeck(deck).findCard(card));
                }
            }
        }
    }
}
export default Manage;
