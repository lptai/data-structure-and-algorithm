/**
 * https://vn.spoj.com/problems/MICEMAZE/
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  // input: process.stdin,
  input: fs.createReadStream('bigo-coding/LECTURE 06: DFS/0.input1.json'),
  output: process.stdout,
  terminal: false,
});

let lines = [];
let currentLine = 0;

class Graph {
  constructor(n) {
    this.n = Array(n)
      .fill(0)
      .map((_, idx) => idx);
    this.adjacency = new Map();
  }

  addEdge(u, v, w) {
    this.adjacency.set(u, (this.adjacency.get(u) || []).concat({ v, w }));
  }
}

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
  lines.push(line.trim());
}).on('close', () => {
  const read = () => lines[currentLine++];
  let n = Number(read()), // the number of cells in the maze
    e = Number(read()), // the number of the exit cell
    t = Number(read()), // the count-down timer
    m = Number(read());

  let g = new Graph(n);
  for (let i = 0; i < m; i++) {
    let [u, v, w] = read().split(' ').map(Number);
    g.addEdge(u, v, w);
  }
});
