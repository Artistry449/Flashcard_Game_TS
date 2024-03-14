import DeckOrganizer_inter from "./DeckOrganizer_inter.js";
import FileManager from "./FileManager.js";
import Deck from "./Deck.js";
import Card from "./Card.js";

class DeckOrgaizer implements DeckOrganizer_inter {
    fileManager = new FileManager("Decks.txt");
    fileManager1 = new FileManager("Cards.txt");

    decks: Deck[];

    deckData: string[];
    cardData: string[];

    constructor() {
        // Ширээнүүдийн дата, картнуудын дата-г файл системээс татаж авчрах
        this.deckData = this.fileManager.readFile();
        this.cardData = this.fileManager1.readFile();

        // console.log(this.cardData)
        // deck-ийг хадгалах бүтэц
        this.decks = [];

        // Авчирсан датагаар лист-д хуваарилалт хийх
        this.optimizeDecksData();
    }

    optimizeDecksData(): void {
        this.deckData.map((el) => {
            const newDeck = new Deck(el);
            this.decks.push(newDeck);
            this.optimizeCardsToItsDeck(newDeck);
        });
    }

    optimizeCardsToItsDeck(deck: Deck): void {
        this.cardData.map((el) => {

            if (el) {
                const parts = el.split("/");
                console.log("1" + el.split("/")[1].split("="));

                if (parts[0] === deck.getName()) {
                    const parts1 = parts[1].split("=");
                    deck.addCard(new Card(parts1[0], parts1[1]));
                }
            }
        });

        // this.decks.map(el => console.log(el.getCards()))
    }

    // -----Ширээний CRUD-----
    createDeck(name: string): void { this.decks.push(new Deck(name)) }

    updateDeck(position: number, newName: string): void { this.decks[position].editName(newName); }

    deleteDeck(position: number): void { this.decks.splice(position, 1); }
    // -----------------------

    pushDecksToDB(): void {
        let data: string = "";

        for (let i = 0; i < this.decks.length; i++)
            data += this.decks[i].getName() + "\n";

        this.fileManager.clearFileData();
        this.fileManager.writeFile(data)
    }

    pushCardsToDB(): void {
        let data: string = "";

        for (let i = 0; i < this.decks.length; i++) {
            for (let j = 0; j < this.decks[i].getCards().length; j++) {
                data += this.decks[i].getName() + "/" + this.decks[i].getCards()[j].getQuestion() + "=" + this.decks[i].getCards()[j].getAnswer() + "\n";
            }
        }

        console.log("data::");
        // console.log(data)

        this.fileManager1.clearFileData();
        this.fileManager1.writeFile(data);
    }

    printAllDecks(): void { this.decks.map((el) => console.log(el)); }

    getDecksSize(): number { return this.decks.length; }

    findDeck(deckName: string): Deck | null {
        this.decks.map((el) => el.getName() === deckName ? el : null);
        return null;
    }

    start(): void {
        // console.log(this.deckData)
        // console.log(this.cardData)

        // console.log("1:")
        // this.decks.map((el) => console.log(el));
        // this.decks.map((el) => console.log(el.getCards()));

        // this.createDeck("hehe")
        // this.createDeck("haha")

        // // console.log("2:")
        // this.decks.map((el) => console.log(el));

        // this.decks[3].addCard(new Card("wqijoaklsm", "woeijadklms"))
        // this.decks[3].addCard(new Card("weqwqwqeqwsda", "woeijadklms"))
        // this.decks[4].addCard(new Card("weqwqwqeqwsda", "woeijadklms"))
        // this.deleteDeck(0)
        // console.log("3:")
        // this.decks.map((el) => console.log(el));

        this.pushDecksToDB();
        this.pushCardsToDB();
    }

}

const deckOrganizer = new DeckOrgaizer();
deckOrganizer.start();