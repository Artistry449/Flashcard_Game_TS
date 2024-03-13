import Card from "./Card.js"

interface Deck_inter {
    getName(): string;

    editName(new_name: string): void;

    getDeckSize(): number;

    addCard(card: Card): void;

    deleteCard(card_position: number): void;

    printAllCards(): void;

    getCards(): Card[]

    findCard(cardQuestion: string): number | null;
}

export default Deck_inter;