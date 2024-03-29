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
                // console.log("1" + el.split("/")[1].split("="));

                if (parts[0] === deck.getName()) {
                    const parts1 = parts[1].split("=");
                    deck.addCard(new Card(parts1[0], parts1[1]));
                }
            }
        });

        // this.decks.map(el => console.log(el.getCards()))
    }

    // -----Ширээний CRUD-----
    createDeck(name: string): void {
        this.decks.push(new Deck(name));
    }

    updateDeck(position: number, newName: string): void {
        this.decks[position].editName(newName);
    }

    // deleteDeck(position: number): void { this.decks.splice(position, 1); }

    deleteDeck(deckName: string) {
        console.log(deckName)
        if (this.findDeck(deckName) !== -1) {
            this.decks.splice(this.findDeck(deckName), 1);


            console.log("Ширээ амжилттай устгагдлаа!");
        }
        else console.log("Ширээ устгах оролдлого амжилтгүй.");

    }
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

        // console.log("data::");
        // console.log(data)

        this.fileManager1.clearFileData();
        this.fileManager1.writeFile(data);
    }
    // optimizeData(): void {
    //     this.deckData = this.fileManager.readFile();
    //     this.cardData = this.fileManager1.readFile();
    //     this.decks = [];
    //     this.optimizeDecksData();
    // }

    printAllDecks(): void { this.decks.map((el) => console.log(el)); }

    getAllDecks() { return this.decks }

    getDeck(deckName: string) {
        // return this.decks[position]

        let deck = this.findDeck(deckName);
        // console.log("getDeck dotorh deckiin ner" + deckName)
        // console.log("oldson deck:" + this.findDeck(deckName))
        return this.decks[deck];

        // this.decks.find((el) => el.getName() === deckName ? el : null);
        // return null;
    }

    getDecksSize(): number { return this.decks.length; }

    // findDeck(deckName: string): Deck | null {
    //     this.decks.map((el) => el.getName() === deckName ? el : null);
    //     return null;
    // }
    findDeck(deckName: string): number {
        // console.log("findDeck dotor irj bgaa deckiin ner: " + deckName + "s")
        for (let i = 0; i < this.decks.length; i++) {
            if (this.decks[i].getName() === deckName) return i;
        }
        return -1;
    }

}

export default DeckOrgaizer;