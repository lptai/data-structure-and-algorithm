/**
 * https://www.spoj.com/problems/SHPATH/
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

let lines = [];
let currentLine = 0;

class Graph {
  constructor(n) {
    this.n = n;
    this.adjecency = new Map();
  }

  addEdge(u, v, w) {
    this.adjecency.set(u, (this.adjecency.get(u) || []).concat({ v, w }));
  }

  dijstra(v) {
    let dist = {},
      pq = new PriorityQueue((a, b) => a < b);

    dist[v] = 0;
    pq.push({ v, w: 0 });

    while (pq.isNotEmpty()) {
      let node = pq.pop();

      for (let item of this.adjecency.get(node.v) || []) {
        if (dist[item.v] === undefined || node.w + item.w < dist[item.v]) {
          dist[item.v] = node.w + item.w;
          pq.push({ v: item.v, w: node.w + item.w });
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
  let q = Number(read());
  const cityMap = new Map();

  while (q > 0) {
    let n = Number(read());
    const graph = new Graph(n);

    let count = 1;
    while (count <= n) {
      let cityName = read();
      const p = Number(read()); // neighbor
      cityMap.set(cityName, count); // city name
      for (let i = 0; i < p; i++) {
        const [nr, cost] = read().split(' ').map(Number);
        graph.addEdge(count, nr, cost);
      }
      count++;
    }

    let r = Number(read());
    while (r > 0) {
      const [city1, city2] = read().split(' ');
      const result = graph.dijstra(cityMap.get(city1));
      console.log(result[cityMap.get(city2)]);
      r--;
    }
    read(); // read empty line
    q--;
  }
});
