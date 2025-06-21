const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('win');
    cell.style.backgroundColor = '#fff';
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  currentPlayer = 'X';
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.innerText !== '') return;

  cell.innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      alert(`${currentPlayer} wins! 🎉`);
    }, 100);
    gameActive = false;
    return;
  }

  if (isDraw()) {
    setTimeout(() => {
      alert("It's a draw! 😅");
    }, 100);
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    const hasWon = combination.every(index => {
      return cells[index].innerText === player;
    });
    if (hasWon) {
      highlightCells(combination);
    }
    return hasWon;
  });
}

function highlightCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add('win');
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText !== '');
}

restartBtn.addEventListener('click', startGame);