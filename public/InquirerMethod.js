import inquirer from "inquirer";
class InquirerMethod {
    type;
    name;
    // private choices: [];
    constructor(type, name) {
        this.type = type;
        this.name = name;
        // this.choices = choices;
    }
    async prompt(message) {
        const answer = await inquirer.prompt([
            {
                type: this.type,
                name: this.name,
                message
                // choices: this.choices
            }
        ]);
        return answer[this.name];
    }
    async promptMany(menuArr) {
        const answer = await inquirer.prompt([
            {
                type: this.type,
                name: this.name,
                choices: menuArr
            }
        ]);
        return answer[this.name];
    }
}
export default InquirerMethod;
