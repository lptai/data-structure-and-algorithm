/**
 *
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  input: fs.createReadStream('bigo-coding/LECTURE 08: DIJKSTRA ALGORITHM/0.input1.json'),
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

const findCost = (vertex, adjacencyList) => {
  const dist = new Map();
  const pq = new PriorityQueue((a, b) => a.w < b.w);

  pq.push({ v: vertex, w: 0 });
  dist.set(vertex, 0);

  while (pq.isNotEmpty()) {
    let top = pq.pop();

    for (let neighbor of adjacencyList.get(top.v)) {
      const { v, w } = neighbor;
      if (!dist.has(v) || top.w + w < dist.get(v)) {
        dist.set(v, top.w + w);
        pq.push({ v: neighbor.v, w: top.w + w});
      }
    }
  }
  return dist;
};

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
  lines.push(line.trim());
}).on('close', () => {
  const read = () => lines[currentLine++];
  let n = read();

  const adjacencyList = new Map();
  const addEdge = (u, v, w) => {
    let uAdj = adjacencyList.get(u) || [],
      vAdj = adjacencyList.get(v) || [];
    uAdj.push({ v, w });
    vAdj.push({ v: u, w });
    adjacencyList.set(v, vAdj);
    adjacencyList.set(u, uAdj);
  };

  for (let i = 0; i < n; i++) {
    const [a, b, w] = read().split(' ');
    addEdge(a, b, Number(w));
  }

  const cost = findCost(read(), adjacencyList);
  let q = read();

  while (q > 0) {
    const v = read();
    console.log(cost.has(v) ? cost.get(v) : 'NO PATH');
    q--;
  }
});
