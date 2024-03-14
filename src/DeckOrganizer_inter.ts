import Deck from "./Deck.js";

interface DeckOrganizer_inter {
    createDeck(name: string): void;

    updateDeck(position: number, newName: string): void;

    deleteDeck(position: number): void;

    optimizeDecksData(): void;

    optimizeCardsToItsDeck(deck: Deck): void;

    pushDecksToDB(): void;

    pushCardsToDB(): void;

    // pushToDB(): void;

    printAllDecks(): void;

    getDecksSize(): number;

    findDeck(deckName: string): Deck | null;
}

export default DeckOrganizer_inter;