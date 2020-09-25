/**
 * https://www.urionlinejudge.com.br/judge/en/problems/view/1610
 * TODO
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 06: DFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

class Graph {
    constructor(node) {
        this.node = Array(node)
            .fill(1)
            .map((_, idx) => idx + 1);
        this.adjacencyList = new Map();
    }

    addEdge(u, v) {
        let uAdj = this.adjacencyList.get(u) || [],
            vAdj = this.adjacencyList.get(v) || [];

        uAdj.push(v);
        // vAdj.push(u);
        this.adjacencyList.set(u, uAdj);
        // this.adjacencyList.set(v, vAdj);
    }



    isCyclic() {
        const isExistPathToNode = (path, node, adj) => {
            let item = adj;

            while (path[item]) {
                item = path[item];
                if (item === node) {
                    return true;
                }
            }

            return false;
        }

        let visited = {};
        for (let n of this.node) {
            let path = {};
            let stack = [n];

            if (visited[n]) {
                continue;
            }

            visited[n] = true;

            while (stack.length > 0) {
                let node = stack.pop();

                // console.log(node, '-->');
                if (!this.adjacencyList.has(node)) {
                    continue;
                }

                let adjencies = this.adjacencyList.get(node);

                for (let adj of adjencies) {
                    if (!visited[adj]) {
                        path[adj] = node;
                        visited[adj] = 1;
                        stack.push(adj);
                    } else if (isExistPathToNode(path, adj, node)) {
                        return true;
                    }

                }
            }
            // console.log('--END--');
        }

        return false;
    }
}

let lines = [];
let currentLine = 0;

/**
 * Time complexity: O (V+E)
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let q = Number(read());

    for (let i = 0; i < q; i++) {
        let [n, m] = read().split(' ').map(Number);

        let graph = new Graph(n);
        for (let r = 0; r < m; r++) {
            const [u, v] = read().split(' ').map(Number);
            graph.addEdge(u, v);
        }
        console.log(graph.isCyclic() ? 'YES' : 'NO');
    }
});
