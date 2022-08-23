import fs from "fs";

const allInput = fs.readFileSync("./day-04.input").toString().split("\n\n");

const drawInput = allInput[0].split(",").map((v) => +v);
const boards = allInput
  .slice(1, drawInput.length)
  .map((s) => s.split("\n"))
  .map((s) =>
    s.map((s) =>
      s
        .trim()
        .split(/\s+/g)
        .map((n) => ({ value: +n, marked: false }))
    )
  );

type Board = Row[];
type MarkedBoard = boolean[][];
type Row = { value: number; marked: boolean }[];

const { answer } = drawInput.reduce(
  ({ boards, answer }, draw) => {
    // if (answer) {
    //   return { boards, answer };
    // }

    boards = boards.map((board) =>
      board.map((row) =>
        row.map((c) => ({ ...c, marked: c.marked || c.value === draw }))
      )
    );

    const winningBoards = boards.filter(hasWin);
    boards = boards.filter((b) => !winningBoards.includes(b));

    if (winningBoards.length > 0) {
      const sum = (s: number, c: number): number => s + c;

      console.log("Winning Boards", JSON.stringify(winningBoards));

      const winningBoard = winningBoards[0];

      const answer =
        winningBoard
          .map((row) =>
            row
              .filter((v) => !v.marked)
              .map((v) => v.value)
              .reduce(sum, 0)
          )
          .reduce(sum, 0) * draw;

      console.log(draw, answer, answer / draw);

      return { boards, answer };
    }

    return { boards, answer };
  },
  { boards, answer: 0 }
);

console.log(answer);

function hasWin(board: Board): boolean {
  const markedBoard = board.map((row) => row.map((v) => v.marked));
  return (
    hasHorizontal(markedBoard) || hasVertical(markedBoard) //||
    //    hasDiagonal(markedBoard) ||
    //    hasReverseDiagonal(markedBoard)
  );
}

function hasHorizontal(board: MarkedBoard): boolean {
  return (
    board.filter((row) => row.reduce((win, v) => win && v, true)).length !== 0
  );
}

function hasVertical(board: MarkedBoard): boolean {
  for (let x = 0; x < 5; ++x) {
    let win = true;
    for (let y = 0; y < 5; ++y) {
      win = win && board[y][x];
    }
    if (win) {
      return win;
    }
  }
  return false;
}

// function hasDiagonal(board: MarkedBoard): boolean {
//   let win = true;
//   for (let i = 0; i < 5; ++i) {
//     win = win && board[i][i];
//   }
//   return win;
// }

// function hasReverseDiagonal(board: MarkedBoard): boolean {
//   let win = true;
//   for (let i = 0; i < 5; ++i) {
//     win = win && board[5 - 1 - i][i];
//   }
//   return win;
// }
