import inquirer from "inquirer";
import chalk from "chalk";

let todo = [];

let condition = true;
while (condition) {
  let questions = await inquirer.prompt([
    {
      name: "questionOne",
      type: "input",
      message: "What would you like to add in your todo list?",
    },
    {
      name: "questionTwo",
      type: "confirm",
      message: "Would you like to add more in  your todo list?",
      default: true,
    },
  ]);
  todo.push(questions.questionOne);
  console.log(todo);
  condition = questions.questionTwo
}
