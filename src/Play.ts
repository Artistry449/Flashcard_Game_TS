import inquirer from "./inquirer.js";
import App from "./App.js";
// import DeckOrgaizer from "./DeckOrganizer.js";
import deckOrganizer from "./DeckOrganizerInstance.js";

class Play implements App {
    private caption: string;
    // private deckOrganizer = new DeckOrgaizer();

    constructor() {
        this.caption = "Тоглох!";
    }

    getCaption(): string {
        return this.caption;
    }
    async printMenu() {
        // const choices = this.deckOrganizer.getAllDecks().map(el => el.getName())
        const choices = deckOrganizer.getAllDecks().map(el => el.getName());
        choices.push("<<Буцах");

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "Таны ширээнүүд",
                choices
            }
        ]);

        return answer["Таны ширээнүүд"];

    }

    async askQA(question: string) {
        const answer = await inquirer.prompt([
            {
                name: "userAnswerGuess",
                type: "input",
                message: question,
            }
        ]);
        return answer.userAnswerGuess;
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    // PLAY START
    async start() {
        console.clear();
        for (; ;) {
            // Хэрэглэгчээс ширээнийх нь нэрийг авах
            let userChoice = await this.printMenu();
            console.log()
            let deck = deckOrganizer.getDeck(userChoice);

            if (userChoice === "<<Буцах") return;
            else {
                if (deck && deck.getCardSize() > 0) {
                    console.log("\nАсуулт хариултын тоглоом эхэллээ!\n");

                    let randomNum = this.getRandomInt(deck.getCards().length);

                    let score = 0;
                    for (let i = 0; i < randomNum; i++) {
                        let card = deck.getCard(this.getRandomInt(randomNum));

                        let userAnswer = await this.askQA(card.getQuestion());

                        console.log(userAnswer);

                        if (userAnswer === card.getAnswer()) {
                            console.log("\nХариулт зөв байна.\n");
                            score++;
                        }
                        else {
                            console.log("\nХариулт буруу байна.\n");
                        }
                    }
                    console.log("\nТаны оноо: " + score + "\n");
                }
            }
        }
    }
}

export default Play;