class Card {
    question;
    answer;
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
    isEqualAnswer(user_answer) {
        return user_answer === this.answer;
    }
    editQuestion(new_question) {
        this.question = new_question;
    }
    editAnswer(new_answer) {
        this.answer = new_answer;
    }
}
export default Card;
