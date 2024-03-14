import inquirer from "inquirer";

class InquirerMethod {

    private type: string;
    private name: string;
    // private choices: [];

    constructor(type: string, name: string) {
        this.type = type;
        this.name = name;
        // this.choices = choices;
    }

    async prompt(message: string) {
        const answer = await inquirer.prompt([
            {
                type: this.type,
                name: this.name,
                message: message

                // choices: this.choices
            }
        ]);

        return answer[this.name];
    }
}

export default InquirerMethod;