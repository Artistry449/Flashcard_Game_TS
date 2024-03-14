import inquirer from "./inquirer.js";
import DeckOrgaizer from "./DeckOrganizer.js";
class Play {
    caption;
    deckOrganizer = new DeckOrgaizer();
    constructor() {
        this.caption = "Тоглох!";
    }
    getCaption() {
        return this.caption;
    }
    async printMenu() {
        // const choices = this.deckOrganizer.getAllDecks().map(el => el.getName())
        const choices = this.deckOrganizer.getAllDecks().map(el => el.getName());
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
    async askQA(question) {
        const answer = await inquirer.prompt([
            {
                name: "userAnswerGuess",
                type: "input",
                message: question,
            }
        ]);
        return answer.userAnswerGuess;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    // PLAY START
    async start() {
        for (;;) {
            // Хэрэглэгчээс ширээнийх нь нэрийг авах
            let userChoice = await this.printMenu();
            console.log();
            console.log("\nАсуулт хариултын тоглоом эхэллээ!\n");
            let deck = this.deckOrganizer.getDeck(userChoice);
            let randomNum = this.getRandomInt(deck.getCards().length);
            // console.log("RANDOM NUM:::", randomNum)
            for (let i = 0; i < randomNum; i++) {
                let card = deck.getCard(this.getRandomInt(randomNum));
                let userAnswer = await this.askQA(card.getQuestion());
                console.log(userAnswer);
                // if(userAnswer === card.getAnswer())
            }
        }
    }
}
export default Play;
