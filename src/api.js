
let tempBoard = [];
let tempRows = 0;
let tempCols = 0;

function makeCells(board) {
  let cells = [];
  for (let y = 0; y < tempRows; y++) {
    for (let x = 0; x < tempCols; x++) {
      if (board[y][x]) {
        cells.push({ x, y });
      }
    }
  }

  return cells;
}

function makeBoard(cells){
  let board = [];
  for (let y = 0; y < tempRows; y++) {
    board[y] = [];
    for (let x = 0; x < tempCols; x++) {
      board[y][x] = false;
    }
  }

  for (const cell of cells) {
    board[cell.y][cell.x] = true;
  }

  return board;
}

export function newBoard(rows, columns, cells) {
  tempCols = columns;
  tempRows = rows;
  tempBoard = makeBoard(cells);
  return "temp-game"
}

export function toggle(gameId, x, y) {
  if (x >= 0 && x <= tempCols && y >= 0 && y <= tempRows) {
    tempBoard[y][x] = !tempBoard[y][x];
  }

  return makeCells(tempBoard);
}

export function nextGeneration(gameId) {
  let newCells = [];

  for (let y = 0; y < tempRows; y++) {
    for (let x = 0; x < tempCols; x++) {
      let neighbors = calculateNeighbors(tempBoard, x, y);
      if (tempBoard[y][x]) {
        if(neighbors === 2 || neighbors === 3) newCells.push({x:x,y:y})
      } else {
        if (!tempBoard[y][x] && neighbors === 3) {
          newCells.push({x:x,y:y})
        }
      }
    }
  }

  tempBoard = makeBoard(newCells);
  return newCells;
}

function calculateNeighbors(board, x, y) {
  let neighbors = 0;
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    let y1 = y + dir[0];
    let x1 = x + dir[1];

    if (x1 >= 0 && x1 < tempCols && y1 >= 0 && y1 < tempRows && board[y1][x1] ) {
      neighbors++;
    }
  }

  return neighbors;
}