#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

// Display the welcome message
console.log(
  chalk.bold.italic.rgb(
    255,
    165,
    0
  )("\n▁ ▂ ▄ ▅ ▆ ▇ █ Welcome To The Countdown Timer █ ▇ ▆ ▅ ▄ ▂ ▁\n")
);

// Function to prompt the user for valid input
async function getUserInput(): Promise<number> {
  const res = await inquirer.prompt<{ userinput: number }>({
    type: "number",
    name: "userinput",
    message: chalk.bold.italic.greenBright(
      "Please enter the duration in seconds (1-60): "
    ),
    validate: (input) => {
      if (isNaN(input) || input < 1 || input > 60) {
        return chalk.bold.italic.redBright(
          "Please enter a valid number between 1 and 60."
        );
      } else {
        return true;
      }
    },
  });

  return res.userinput;
}

// Function to start the countdown
function startTimer(duration: number): void {
  let remainingTime = duration;

  const interval = setInterval(() => {
    if (remainingTime <= 0) {
      console.log(chalk.bold.italic.yellowBright("Timer has expired"));
      clearInterval(interval);
      return;
    }

    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;

    console.log(
      `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    );
    remainingTime--;
  }, 1000);
}

// Main function to run the application
async function main(): Promise<void> {
  const input = await getUserInput();
  startTimer(input);
}

main();
