const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusText.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return board[index] === currentPlayer;
    });
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
