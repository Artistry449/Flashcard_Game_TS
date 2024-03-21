import Card from "./Card.js";
import Deck_inter from "./Deck_inter.js";

class Deck implements Deck_inter {
    private name: string;
    private Cards: Card[];

    constructor(name: string) {
        this.name = name;
        this.Cards = [];
    }

    getName(): string {
        return this.name;
    }

    editName(new_name: string): void {
        this.name = new_name;
    }

    getDeckSize(): number {
        return this.Cards.length;
    }

    addCard(card: Card): void {
        this.Cards.push(card);
    }

    deleteCard(card_position: number): void {
        this.Cards.splice(card_position, 1);
    }

    printAllCards(): void {
        this.Cards.map((el) => console.log(el.getQuestion()));
    }

    getCards(): Card[] {
        return this.Cards;
    }

    findCard(cardQuestion: string): number {
        for (let i = 0; i < this.Cards.length; i++) {
            if (this.Cards[i].getQuestion() === cardQuestion)
                return i;
        }
        return -1;
    }

    getCard(position: number): Card {
        return this.Cards[position];
    }


    getCardSize(): number {
        return this.Cards.length;
    }
}

export default Deck;