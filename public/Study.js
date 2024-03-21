import inquirer from "./inquirer.js";
// import DeckOrgaizer from "./DeckOrganizer.js";
import deckOrganizer from "./DeckOrganizerInstance.js";
import Card from "./Card.js";
import InquirerMethod from "./InquirerMethod.js";
class Study {
    caption;
    // private deckOrganizer = new DeckOrgaizer();
    constructor() {
        this.caption = "Суралцах!";
    }
    getCaption() {
        return this.caption;
    }
    async printMenu() {
        const choices = deckOrganizer.getAllDecks().map(el => el.getName());
        choices.push("Шинэ ширээ нэмэх");
        choices.push("<<Буцах");
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                // message: "Та меню-ээс сонголтоо хийнэ хүү",
                choices: choices
            }
        ]);
        return answer["userMenuChoice"];
    }
    async printDeckCardMenu() {
        // const choices = this.deckOrganizer.getDeck(position).getCards().map((el) => el.getQuestion());
        const choices = ["Шинэ карт нэмэх", "<<Буцах"];
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userMenuChoice",
                // message: "Та меню-ээс сонголтоо хийнэ үү",
                choices
            }
        ]);
        return answer["userMenuChoice"];
    }
    async start() {
        console.clear();
        for (;;) {
            console.clear();
            let userChoice = await this.printMenu();
            // Бүртгэгдсэн байгаа ширээнүүдийг хэвлээд хэрвээ хэрэглэгч аль нэг ширээг сонговол тус ширээнд байгаа картнуудыг хэвлээд + шинэ карт нэмэх товчийг гаргаж ирнэ эсрэг тохиолдолд буцна.
            // Хэрэглэгч буцах-ыг сонговол
            if (userChoice === "<<Буцах")
                return;
            // Хэрэглэгч шинэ ширээ нэмэх-ыг сонговол
            else if (userChoice === "Шинэ ширээ нэмэх") {
                const prompt = new InquirerMethod("input", "newDeck");
                let name = await prompt.prompt("Та шинэ ширээний нэрийг оруулна уу");
                deckOrganizer.createDeck(name);
                deckOrganizer.pushDecksToDB();
            }
            // Хэрэглэгч ширээ сонговол
            else {
                console.clear();
                let deck = deckOrganizer.getDeck(userChoice);
                console.log("\n" + deck.getName() + " ширээний картнууд: " + " \n");
                deck.printAllCards();
                console.log();
                userChoice = await this.printDeckCardMenu();
                // Хэрэглэгч буцах-ыг сонговол
                if (userChoice === "<<Буцах")
                    break;
                // Шинэ карт нэмэх-г сонговол
                else if (userChoice === "Шинэ карт нэмэх") {
                    console.clear();
                    deck.printAllCards();
                    const prompt = new InquirerMethod("input", "newCard");
                    let question = await prompt.prompt("Та шинэ картны асуултыг оруулна уу");
                    let answer = await prompt.prompt("Та шинэ картны хариултыг оруулна уу");
                    deck.addCard(new Card(question, answer));
                    deckOrganizer.pushCardsToDB();
                }
            }
        }
    }
}
export default Study;
