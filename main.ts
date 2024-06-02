#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

interface Task {
  name: string;
  completed: boolean;
}

let tasks: Task[] = [];
const success = chalk.green;
const failure = chalk.red;
const info = chalk.blue;

console.log(chalk.blue("Welcome to the To-Do List Application!"));
while (true) {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        "Add Task",
        "View Tasks",
        "Complete Task",
        "Delete Task",
        "Exit",
      ],
    },
  ]);

  if (answers.action == "View Tasks") {
    console.log(info("Your To-Do List:"));
    if (tasks.length === 0) {
      console.log(info("No tasks found."));
    } else {
      tasks.forEach((task, index) => {
        const status = task.completed ? success("✓") : failure("✗");
        console.log(`${index + 1}. ${task.name} ${status}`);
      });
    }
  } else if (answers.action == "Add Task") {
    const {taskName} = await inquirer.prompt({
      type: "input",
      name: "taskName",
      message: "Enter the task name:",
    });

    tasks.push({ name: taskName, completed: false });
    console.log(success(`Task "${taskName}" added successfully!`));
  } else if (answers.action == "Complete Task") {
    if (tasks.length === 0) {
      console.log(failure("No tasks available to mark as completed."));
    }

    const {taskIndex} = await inquirer.prompt({
      type: "list",
      name: "taskIndex",
      message: "Select a task to mark as completed:",
      choices: tasks.map((task, index) => ({
        name: `${task.name} ${task.completed ? success("✓") : failure("✗")}`,
        value: index,
      })),
    });

    tasks[taskIndex].completed = true;
    console.log(
      success(`Task "${tasks[taskIndex].name}" marked as completed!`)
    );
  } else if (answers.action == "Delete Task") {
    if (tasks.length === 0) {
      console.log(failure("No tasks available to delete."));
    }

    const { taskIndex } = await inquirer.prompt({
      type: "list",
      name: "taskIndex",
      message: "Select a task to delete:",
      choices: tasks.map((task, index) => ({
        name: `${task.name} ${task.completed ? success("✓") : failure("✗")}`,
        value: index,
      })),
    });

    const deletedTask = tasks.splice(taskIndex, 1);
    console.log(success(`Task "${deletedTask[0].name}" deleted successfully!`));
  } else if (answers.action == "Exit") {
    console.log(
      info("Thank you for using the To-Do List Application. Goodbye!")
    );
    break;
  }
}
