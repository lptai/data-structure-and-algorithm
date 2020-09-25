/**
 * https://vn.spoj.com/problems/ALLIZWEL/
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  input: fs.createReadStream('bigo-coding/LECTURE 06: DFS/0.input1.json'),
  output: process.stdout,
  terminal: false,
});

let lines = [];
let currentLine = 0;

const SENTENCE = 'ALLIZZWELL';
const DIRECTION = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const key = (x, y) => `${x}-${y}`;
const dfs = (matrix) => {
  const visited = {};
  let stack = [];

  const isInRange = (x, y) => x >= 0 && y >= 0 && x < matrix.length && y < matrix[x].length;
  const sentenceMap = SENTENCE.split('').reduce(
    (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }),
    {},
  );

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (sentenceMap[matrix[i][j]] < 1 || visited[key(i, j)]) {
        continue;
      }
      let count = 0;

      const cloned = SENTENCE.split('').reduce(
        (acc, c) => ({ ...acc, [c]: 0 }),
        {},
      );

      const doChecking = (x, y) => {
        const char = matrix[x][y];
        if (cloned[char] < sentenceMap[char]) {
          cloned[char]++;
          count++;
        }
      }

      visited[key(i, j)] = true;
      stack = [{ x: i, y: j }];
      const path = {};

      while (stack.length > 0) {
        let node = stack.pop();

        for (let item of DIRECTION) {
          let [x, y] = [node.x + item.x, node.y + item.y];

          if (isInRange(x, y) && !visited[key(x, y)] && SENTENCE.indexOf(matrix[x][y]) > 0) {
            visited[key(x, y)] = true;
            stack.push({ x, y });
            path[key(x, y)] = key(node.x, node.y);
          }
        }
      }

      if (count === SENTENCE.length) {
        console.log(path);
        return true;
      }
    }
  }

  return false;
};

// console.log(dfs(['AWE.AZW.', 'LLL.LZEL', 'IZZ.LIL.']));

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
  lines.push(line.trim());
}).on('close', () => {
  const read = () => lines[currentLine++];
  let q = Number(read());

  for (let k = 0; k < q; k++) {
    let [row] = read().split(' ').map(Number);
    const matrix = [];

    for (let i = 0; i < row; i++) {
      matrix.push(read());
    }

    console.log(dfs(matrix) ? 'YES' : 'NO');

    read(); // read empty str
  }
});
