/**
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  // input: process.stdin,
  input: fs.createReadStream('bigo-coding/LECTURE 08: DIJKSTRA ALGORITHM/0.input1.json'),
  output: process.stdout,
  terminal: false,
});

let lines = [];
let currentLine = 0;

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
  lines.push(line.trim());
}).on('close', () => {
  const read = () => lines[currentLine++];
  let q = Number(read());

  for (let i = 0; i < q; i++) {
    let [row, col] = read().split(' ').map(Number);
  }
});
