/**
 * https://leetcode.com/problems/valid-sudoku/
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  const rows = {},
    cols = {},
    subBox = {};

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '.') {
        continue;
      }

      let subRow = Number.parseInt(i / 3),
        subCol = Number.parseInt(j / 3);
      let item = board[i][j];
      let key = `${subRow}-${subCol}`;
      rows[i] = rows[i] || {};
      cols[j] = cols[j] || {};
      subBox[key] = subBox[key] || {};

      if (rows[i][item]) {
        return false;
      } else rows[i][item] = item;
      if (cols[j][item]) {
        return false;
      } else cols[j][item] = item;

      if (subBox[key][item]) {
        return false;
      } else subBox[key][item] = item;
    }
  }
  return true;
};

console.log(
  isValidSudoku([
    ["8","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
  ]),
  false,
);
