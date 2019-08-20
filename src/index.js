import "./styles.css";

const turnTime = 10;
const tick = 50;
const emptyOffset = 0;//3;
const defaultSize = 5;
let currentPlayer = 1;
let gameEnded = false;
let board = [];

const findBoundaries = () => {
  let minX = null;
  let minY = null;
  let maxX = null;
  let maxY = null;

  let boardCounts = board.map(row => {
    return row.filter(e => !!e).length;
  });

  let i = boardCounts.length;

  while (i-- && boardCounts[i] === 0);
  maxY = Math.max(i, maxY || 0);

  i = 0;
  while (!boardCounts[i] && i <= board.length) {
    i++;
  }

  minY = Math.min(i, minY || Number.MAX_VALUE);

  board.forEach((row, i) => {
    let j = row.length;

    while (j-- && !row[j]);
    maxX = Math.max(j, maxX || 0);

    j = 0;
    while (!row[j] && j <= row.length) {
      j++;
    }

    minX = Math.min(j, minX || Number.MAX_VALUE);
  });

  return {
    minX,
    minY,
    maxX,
    maxY
  };
};

const initialize = () => {
  let boundaries = findBoundaries();
  let rowLength = board[0].length;

  let rowsTopCount = Math.max(emptyOffset - boundaries.minY, 0);
  let rowsBotCount = Math.max(
    emptyOffset - board.length + 1 + boundaries.maxY,
    0
  );
  let rowsLeftCount = Math.max(emptyOffset - boundaries.minX, 0);
  let rowsRightCount = Math.max(
    emptyOffset - rowLength + 1 + boundaries.maxX,
    0
  );

  let left = Array.from({ length: rowsLeftCount }, () => null);
  let right = Array.from({ length: rowsRightCount }, () => null);

  let row = Array.from(
    { length: rowLength + rowsLeftCount + rowsRightCount },
    () => null
  );

  board = board.map(row => {
    return left.concat(row.concat(right));
  });

  for (let i = 0; i < rowsTopCount; i++) {
    board = [row].concat(board);
  }

  for (let i = 0; i < rowsBotCount; i++) {
    board = board.concat([row]);
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

const someoneWon = () => {
  return board.some((row, i) => {
    return row.some((_, j) => {
      if (
        j + 4 in board &&
        board[i][j] === currentPlayer &&
        board[i][j + 1] === currentPlayer &&
        board[i][j + 2] === currentPlayer &&
        board[i][j + 3] === currentPlayer &&
        board[i][j + 4] === currentPlayer
      )
        return true;
      else if (
        i + 4 in board &&
        board[i][j] === currentPlayer &&
        board[i + 1][j] === currentPlayer &&
        board[i + 2][j] === currentPlayer &&
        board[i + 3][j] === currentPlayer &&
        board[i + 4][j] === currentPlayer
      )
        return true;
      else if (
        i + 4 in board &&
        j + 4 in board &&
        board[i][j] === currentPlayer &&
        board[i + 1][j + 1] === currentPlayer &&
        board[i + 2][j + 2] === currentPlayer &&
        board[i + 3][j + 3] === currentPlayer &&
        board[i + 4][j + 4] === currentPlayer
      )
        return true;
      else if (
        i - 4 in board &&
        j + 4 in board &&
        board[i][j] === currentPlayer &&
        board[i - 1][j + 1] === currentPlayer &&
        board[i - 2][j + 2] === currentPlayer &&
        board[i - 3][j + 3] === currentPlayer &&
        board[i - 4][j + 4] === currentPlayer
      )
        return true;
      return false;
    });
  });
};

const render = () => {
  const container = document.getElementById("board");

  container.innerHTML = "";
  const table = document.createElement("table");
  board.forEach((row, i) => {
    const rowElement = document.createElement("tr");
    table.appendChild(rowElement);
    row.forEach((el, j) => {
      const cell = document.createElement("td");
      cell.onclick = () => {
        if (!board[i][j] && !gameEnded) {
          board[i][j] = currentPlayer;
          initialize();
          render();
          if (someoneWon()) {
            gameEnded = true;
            alert("Player " + currentPlayer + " won!");
          } else {
            switchPlayer();
          }
        }
      };
      switch (el) {
        case 1:
          cell.className = 'x';
          cell.innerText = "x";
          break;
        case 2:
          cell.className = 'o';
          cell.innerText = "o";
          break;
        default:
          cell.innerText = " ";
      }
      rowElement.appendChild(cell);
    });
  });
  container.appendChild(table);
};

const initializeTimer = () => {
  const container = document.getElementById("timer");
  container.innerHTML = "<div id='turn'></div>" + 
                        "<div class=\"pb-grey\">" + 
                          "<div id=\"pbar\" class=\"pb-bar\" style=\"width:0%\">0%</div>" +
                        "</div>";
}

const renderTimer = (player, currentTime) => {
  const bar = document.getElementById("pbar");
  const turn = document.getElementById("turn");
  const percentage = (currentTime/turnTime)*100;

  bar.style.width = percentage + "%";
  bar.innerText = percentage.toFixed(1) + "%";

  turn.innerText = "Player " + currentPlayer + " turn";

  if (!gameEnded) {
    setTimeout(() => {
      if (currentTime > turnTime) {
        switchPlayer();
        renderTimer(currentPlayer, 0 + tick/1000);
      } else if (player !== currentPlayer) {
        renderTimer(currentPlayer, 0 + tick/1000);
      } else {
        renderTimer(currentPlayer, currentTime + tick/1000);
      }
    }, tick);
  }
}

const main = () => {
  board = [];
  for (let i = 0 ; i < defaultSize ; i++) {
    board.push(Array.from(
      { length: defaultSize },
      () => null
    ));
  }
  gameEnded = false;
  initialize();
  initializeTimer();
  renderTimer(currentPlayer, 0);
  render();
}

export default main;