import inquirer from "inquirer";
const answer = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "number",
        name: "age",
        message: "Enter age: "
    },
    {
        type: "list",
        name: "gender",
        message: "What is your gender?",
        choices: ["Male", "Female", "Prefer not to say"]
    }
]);
console.log("Your name is: testing..." + answer.name);
