/**
 * https://vn.spoj.com/problems/MICEMAZE/
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  // input: fs.createReadStream('bigo-coding/LECTURE 08: DIJKSTRA ALGORITHM/0.input1.json'),
  output: process.stdout,
  terminal: false,
});

let lines = [];
let currentLine = 0;

const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  isNotEmpty() {
    return this.size() > 0;
  }

  peek() {
    return this._heap[top];
  }

  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

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

  dijkstra(v) {
    const dist = new Map(),
      pq = new PriorityQueue((a, b) => a <= b);

    pq.push({ v, w: 0 });
    dist.set(v, 0);

    while (pq.isNotEmpty()) {
      let node = pq.pop();
      for (let item of this.adjacency.get(node.v) || []) {
        if (!dist.has(item.v) || item.w + node.w < dist.get(item.v)) {
          dist.set(item.v, item.w + node.w);
          pq.push({ v: item.w, w: item.w + node.w });
        }
      }
    }

    return dist;
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
    g.addEdge(v, u, w);
  }

  const result = g.dijkstra(e);
  let count = 0;
  for (let [_, value] of result) {
    if (value <= t) {
      count++;
    }
  }
  console.log(count);
});
