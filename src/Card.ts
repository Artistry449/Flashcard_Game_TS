import Card_inter from "./Card_inter.js"

class Card implements Card_inter {
    private question: string;
    private answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    getQuestion(): string {
        return this.question;
    }

    getAnswer(): string {
        return this.answer;
    }

    isEqualAnswer(user_answer: string): boolean {
        return user_answer === this.answer;
    }

    editQuestion(new_question: string): void {
        this.question = new_question;
    }

    editAnswer(new_answer: string): void {
        this.answer = new_answer;
    }
}

export default Card;