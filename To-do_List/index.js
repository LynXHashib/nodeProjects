const fs = require("fs");
// const express = require("express");
const path = require("path");
const readline = require("readline");

// Easier module
// const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// CONSTANTS
const PORT = 3000;
const entry = JSON.parse(fs.readFileSync("./entry.json", "utf-8"));

console.log(entry);
// rl.question("Task id: ", (tasksNumber) => {
//   fs.writeFileSync("./entry.json", tasksNumber);
//   console.log(tasks);
//   rl.close();
// });
// app.listen(PORT, () => {
//   console.log("Server is Running on port 3000");
// });
