const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function restartGame() {
  currentPlayer = 'X';
  cells = Array(9).fill(null);
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
status.textContent = `Player ${currentPlayer}'s turn`;
