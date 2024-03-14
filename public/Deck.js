class Deck {
    name;
    Cards;
    constructor(name) {
        this.name = name;
        this.Cards = [];
    }
    getName() {
        return this.name;
    }
    editName(new_name) {
        this.name = new_name;
    }
    getDeckSize() {
        return this.Cards.length;
    }
    addCard(card) {
        this.Cards.push(card);
    }
    deleteCard(card_position) {
        this.Cards.splice(card_position, 1);
    }
    printAllCards() {
        this.Cards.map((el) => console.log(el.getQuestion()));
    }
    getCards() {
        return this.Cards;
    }
    findCard(cardQuestion) {
        for (let i = 0; i < this.Cards.length; i++) {
            if (this.Cards[i].getQuestion() === cardQuestion)
                return i;
        }
        return null;
    }
    getCard(position) {
        return this.Cards[position];
    }
}
export default Deck;
