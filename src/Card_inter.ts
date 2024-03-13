interface Card_inter {

    getQuestion(): string;

    getAnswer(): string;

    isEqualAnswer(user_answer: string): boolean;

    editQuestion(new_question: string): void;

    editAnswer(new_answer: string): void;
}

export default Card_inter