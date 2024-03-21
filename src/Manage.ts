import inquirer from "./inquirer.js";
import App from "./App.js";
// import DeckOrgaizer from "./DeckOrganizer.js";
import deckOrganizer from "./DeckOrganizerInstance.js";
import InquirerMethod from "./InquirerMethod.js";

class Manage implements App {
    private caption: string;
    // private deckOrganizer = new DeckOrgaizer();

    constructor() {
        this.caption = "Цуглуулгыг өөрчлөх!";
    }

    getCaption(): string {
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
        const choices = deckOrganizer.getAllDecks().map(el => el.getName());
        console.log(deckOrganizer.getDecksSize());
        // console.log("deck choices iin hemjee::::" + choices.length);
        if (choices.length === 0) console.log("Одоогоор ширээ байхгүй байна");

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

    async printDeckCardMenu(deckName: string) {
        const choices = deckOrganizer.getDeck(deckName).getCards().map((el) => el.getQuestion());
        if (choices.length === 0) console.log("Тус ширээнд карт байхгүй байна.");
        choices.push("<<Буцах");
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                message: "Та аль картыг сонгох вэ?",
                choices
            }
        ]);
        return answer["userMenuChoice"]
    }
    async start() {
        console.clear();

        for (; ;) {
            let userMenuChoice = await this.printMenu();

            // console.log(userMenuChoice);

            if (userMenuChoice === "<<Буцах") return;

            else if (userMenuChoice === "Ширээний нэр өөрчлөх") {
                console.clear();
                let userMenuChoice = await this.printDecks();

                if (userMenuChoice === "<<Буцах")
                    continue;
                // else {
                let deck = await deckOrganizer.findDeck(userMenuChoice);

                let inputer = new InquirerMethod("input", "changeDeckName");

                let newDeckName = await inputer.prompt("Ширээний шинэ нэрийг оруулна уу");

                // if (userMenuChoice === "<<Буцах") return;
                // deck.editName(newDeckName);
                deckOrganizer.updateDeck(deck, newDeckName);
                deckOrganizer.pushDecksToDB();
                console.log("Ширээний нэр амжилттай өөрчлөгдлөө!");

                // }

            }
            else if (userMenuChoice === "Ширээ устгах") {
                console.clear();
                console.log("Аль ширээг устгах вэ?")

                let listChoice = deckOrganizer.getAllDecks().map((el) => el.getName());
                listChoice.push("<<Буцах");

                let inputer = new InquirerMethod("list", "deleteDeck");


                let userDeckChoice = await inputer.promptMany(listChoice);
                if (userDeckChoice === "<<Буцах") continue;
                deckOrganizer.deleteDeck(userDeckChoice);

                deckOrganizer.pushDecksToDB();
                deckOrganizer.pushCardsToDB();
            }
            else if (userMenuChoice === "Картны асуулт өөрчлөх") {
                let deck = await this.printDecks();

                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);

                    const prompt = new InquirerMethod("input", "Шинэ асуулт:");

                    if (card !== "<<Буцах")
                        deckOrganizer.getDeck(deck).getCard(deckOrganizer.getDeck(deck).findCard(card)).editQuestion(await prompt.prompt("Шинэ асуулт:"))
                }
                deckOrganizer.pushCardsToDB();
            }
            else if (userMenuChoice === "Картны хариулт өөрчлөх") {
                let deck = await this.printDecks();

                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);

                    const prompt = new InquirerMethod("input", "Шинэ хариулт:");

                    if (card !== "<<Буцах")
                        deckOrganizer.getDeck(deck).getCard(deckOrganizer.getDeck(deck).findCard(card)).editAnswer(await prompt.prompt("Шинэ хариулт:"))
                }
                deckOrganizer.pushCardsToDB();

            }
            else if (userMenuChoice === "Карт устгах") {
                let deck = await this.printDecks();

                if (deck !== "<<Буцах") {
                    let card = await this.printDeckCardMenu(deck);

                    if (card !== "<<Буцах")
                        deckOrganizer.getDeck(deck).deleteCard(deckOrganizer.getDeck(deck).findCard(card));
                }
                deckOrganizer.pushCardsToDB();
            }

        }

    }

}

export default Manage;