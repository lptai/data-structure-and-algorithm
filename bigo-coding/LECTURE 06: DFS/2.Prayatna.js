'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 06: DFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];
let currentLine = 0;

class Graph {
    constructor(node) {
        this.adjacencyList = new Map();
        this.node = Array(node)
            .fill(0)
            .map((_, idx) => idx);
    }

    addEdge(u, v) {
        let uAdj = this.adjacencyList.get(u) || [],
            vAdj = this.adjacencyList.get(v) || [];
        uAdj.push(v);
        vAdj.push(u);
        this.adjacencyList.set(v, vAdj);
        this.adjacencyList.set(u, uAdj);
    }

    countConnectedComponent() {
        let parentVisited = {};
        let count = 0;
        for (let n of this.node) {
            if (!parentVisited[n]) {
                let visited = { [n]: true },
                    stack = [n];

                while (stack.length > 0) {
                    let node = stack.pop();
                    if (!this.adjacencyList.has(node)) {
                        continue;
                    }

                    for (let item of this.adjacencyList.get(node)) {
                        if (!visited[item]) {
                            parentVisited[item] = true;
                            visited[item] = true;
                            stack.push(item);
                        }
                    }
                }

                count++;
            }
        }
        return count;
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
    let t = Number(read());

    for (let i = 0; i < t; i++) {
        let node = Number(read());
        let e = Number(read());

        let graph = new Graph(node);
        for (let j = 0; j < e; j++) {
            let [u, v] = read().split(' ').map(Number);
            graph.addEdge(u, v);
        }

        const connectedComponent = graph.countConnectedComponent();
        console.log(connectedComponent);
    }
});
