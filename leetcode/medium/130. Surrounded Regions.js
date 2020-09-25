/**
 * https://leetcode.com/problems/surrounded-regions/
 */

const direction = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];
const key = (x, y) => `${x}-${y}`;
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = function (board) {
  const visited = {};
  const isInRange = (x, y) => x >= 0 && y >= 0 && x < board.length && y < board[x].length;

  const bfs = (v, callback = () => {}) => {
    if (board[v.x][v.y] === 'X' || visited[key(v.x, v.y)]) {
      return;
    }
    const queue = [v];

    visited[key(v.x, v.y)] = true;

    while (queue.length > 0) {
      let node = queue.shift();

      for (let item of direction) {
        let [x, y] = [node.x + item.x, node.y + item.y];
        if (!isInRange(x, y) || visited[key(x, y)]) {
          continue;
        }
        if (board[x][y] === 'O') {
          visited[key(x, y)] = true;
          queue.push({ x, y });
        }
      }
      callback(node);
    }
  };

  if (board.length < 3 || board[0].length < 3) return board;

  for (let i = 0; i < board.length; i++) {
    [0, board[i].length - 1].forEach((j) => bfs({ x: i, y: j }));
  }

  for (let j = 0; j < board[0].length; j++) {
    [0, board.length - 1].forEach((i) => bfs({ x: i, y: j }));
  }

  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board[i].length - 1; j++) {
      if (board[i][j] === 'X' || visited[key(i, j)]) {
        continue;
      }

      bfs({ x: i, y: j }, ({ x, y }) => {
        board[x][y] = 'X';
      });
    }
  }

  return board;
};

const o1 = solve([
  ['X', 'O', 'X', 'O', 'X', 'O'],
  ['O', 'X', 'O', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'O', 'X', 'O'],
  ['O', 'X', 'O', 'X', 'O', 'X'],
]);

console.log(o1);
