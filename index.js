let firstName = true;
let str = `My name is ${firstName ? "Manish" : "Soni"}`;

let players = [];
let turn = 0;
let dimension = parseInt(document.getElementById("dimension").value);
let gameOver = false;
let board = new Array(dimension)
  .fill("")
  .map(() => new Array(dimension).fill(""));
console.log(str);

const changeDimension = (event) => {
  dimension = parseInt(event.target.value);
  board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};
document
  .getElementById("dimension")
  .addEventListener("change", changeDimension);

const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let select = document.getElementById("dimension");

  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);

  let game = document.getElementById("playArea");
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);

  document.getElementById("turn1").innerHTML = player1 + "'s turn";
  document.getElementById("turn2").innerHTML = player2 + "'s turn";
  initGame();
};

const handleClick = (cell, i, j) => {
  const el = cell;
  if (el.innerHTML !== "" || gameOver) {
    return;
  }
  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];
  if (board[i][j] === "X") {
    el.style.backgroundColor = "blue";
    el.style.color = "#ff00e6";
    // rightImage.backgroundColor = "green";
    // leftImage.backgroundColor = "none";
  } else {
    el.style.backgroundColor = "#ff00e6";
    el.style.color = "navy";
  }

  if (calculateWinner()) {
    gameOver = true;
    alert(players[turn % 2] + "won");
    return;
  }
  turn++;

  let leftImage = document.getElementById("left-image");
  let rightImage = document.getElementById("right-image");
  leftImage.backgroundColor = "green";
  rightImage.backgroundColor = "none";
  // document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";

  if (turn === dimension * dimension) {
    gameOver = true;
    alert("Game is drawn");
    return;
  }
};

const isEmpty = (value) => !value || !value.trim();

const initGame = () => {
  let gameContainer = document.getElementById("game-container");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => handleClick(cell, i, j));
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
};
const calculateWinner = () => {
  let count = 0;
  for (let a = 0; a < dimension; a++) {
    if (board[a][a] === board[0][0] && !isEmpty(board[a][a])) {
      count++;
    }
    if (count === dimension) {
      return true;
    }
  }
  for (let a = 0; a < dimension; a++) {
    count = 0;
    let temp = board[a][0];
    for (let b = 0; b < dimension; b++) {
      if (board[a][b] === temp && !isEmpty(board[a][b])) {
        count++;
      }
    }
    if (count === dimension) {
      return true;
    }
  }
  for (let a = 0; a < dimension; a++) {
    count = 0;
    let temp = board[0][a];
    for (let b = 0; b < dimension; b++) {
      if (board[b][a] === temp && !isEmpty(board[b][a])) {
        count++;
      }
    }
    if (count === dimension) {
      return true;
    }
  }
  return false;
};
