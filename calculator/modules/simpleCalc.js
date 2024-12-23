const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const plus = () => {
  rl.question("Enter two numbers separated by a space: ", (input) => {
    const [input1, input2] = input.split(" ").map(Number);

    if (isNaN(input1) || isNaN(input2)) {
      console.log(`INVALID`);
      rl.close();
    } else {
      console.log(`${input1} + ${input2} = ${input1 + input2}`);
      rl.close();
    }
  });
};
const minus = () => {
  rl.question("Enter two numbers separated by a space: ", (input) => {
    const [input1, input2] = input.split(" ").map(Number);

    if (isNaN(input1) || isNaN(input2)) {
      console.log(`INVALID`);
      rl.close();
    } else {
      console.log(`${input1} - ${input2} = ${input1 - input2}`);
      rl.close();
    }
  });
};
const multiply = () => {
  rl.question("Enter two numbers separated by a space: ", (input) => {
    const [input1, input2] = input.split(" ").map(Number);

    if (isNaN(input1) || isNaN(input2)) {
      console.log(`INVALID`);
      rl.close();
    } else {
      console.log(`${input1} x ${input2} = ${input1 * input2}`);
      rl.close();
    }
  });
};
const divide = () => {
  rl.question("Enter two numbers separated by a space: ", (input) => {
    const [input1, input2] = input.split(" ").map(Number);

    if (isNaN(input1) || isNaN(input2) || input2 === 0) {
      console.log(`INVALID`);
      rl.close();
    } else {
      console.log(`${input1} / ${input2} = ${input1 / input2}`);
      rl.close();
    }
  });
};
const selection = () => {
  rl.question("Select what you want to do: ", (input) => {
    if (input == 1) {
      plus();
    } else if (input == 2) {
      minus();
    } else if (input == 3) {
      multiply();
    } else if (input == 4) {
      divide();
    } else {
      console.log(`INVALID. Try again`);
      rl.close();
    }
  });
};
module.exports = selection;
