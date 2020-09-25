/**
 * Breadth First Search: Shortest Reach
 * https://www.hackerrank.com/challenges/bfsshortreach/problem
 */
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 05: BFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

class Graph {
    constructor(vertices = []) {
        this.adjacencyList = new Map();
        this.node = vertices;
    }

    addVertex(v) {
        this.node.push(v);
    }

    addEdge(u, v, weight = 6) {
        let uAdjacentVertices = this.adjacencyList.get(u) || [],
            vAdjacentVertices = this.adjacencyList.get(v) || [];

        uAdjacentVertices.push({ vertex: v, weight });
        vAdjacentVertices.push({ vertex: u, weight });

        this.adjacencyList.set(v, vAdjacentVertices);
        this.adjacencyList.set(u, uAdjacentVertices);
    }

    bfs(v) {
        let visited = {};
        let queue = [v];
        let path = new Map();

        while (queue.length > 0) {
            let node = queue.shift();
            let adjacentVertices = this.adjacencyList.get(node);

            if (!adjacentVertices) {
                continue;
            }
            for (let item of adjacentVertices) {
                if (!visited[item.vertex]) {
                    visited[item.vertex] = true;
                    queue.push(item.vertex);
                    path.set(item.vertex, node);
                }
            }
        }

        return path;
    }
}

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    // let q = lines[count][0]; // number of queries
    let iterator = 1;

    while (iterator < lines.length) {
        let n = lines[iterator][0], // number of nodes
            m = lines[iterator][1]; // number of edges
        iterator++;

        let graph = new Graph(
            Array(n)
                .fill(0)
                .map((_, idx) => idx + 1),
        );

        let pivot = iterator + m;
        while (iterator < pivot) {
            let u = lines[iterator][0],
                v = lines[iterator][1];
            graph.addEdge(u, v);
            iterator++;
        }

        let s = lines[iterator][0];
        const path = graph.bfs(s);
        const output = [];
        for (let i = 1; i <= n; i++) {
            if (i === s) {
                continue;
            }
            if (path.get(i) === undefined) {
                output.push(-1);
                continue;
            }

            let dest = i;
            let weight = 0;
            while (dest !== s) {
                dest = path.get(dest);
                weight += 6;
            }
            output.push(weight);
        }
        console.log(output.join(' '));
        iterator++;
    }
});

'use strict';
/**
 * Solution for hackkerank
 * Complexity   O Q*(N + M)
 * Space:
 * @param {*} n number of nodes
 * @param {*} m number of edges
 * @param {*} edges
 * @param {*} s starting node
 */
function bfs(n, m, edges, s) {
    const adjacencyList = new Map();

    // Init adjacency list
    edges.forEach((item) => {
        let u = item[0],
            v = item[1];
        let uAdjacentVertices = adjacencyList.get(u) || [],
            vAdjacentVertices = adjacencyList.get(v) || [];

        uAdjacentVertices.push(v);
        vAdjacentVertices.push(u);

        adjacencyList.set(v, vAdjacentVertices);
        adjacencyList.set(u, uAdjacentVertices);
    });

    // bfs travesal

    let visited = new Map();
    let path = new Map();
    let queue = [s];
    visited.set(s, true);

    while (queue.length > 0) {
        let node = queue.shift();

        let adjacency = adjacencyList.get(node);

        if (!adjacency) {
            continue;
        }
        for (let item of adjacency) {
            if (!visited.has(item)) {
                visited.set(item, true);
                path.set(item, node);
                queue.push(item);
            }
        }
    }

    // print path
    const output = [];
    for (let i = 1; i <= n; i++) {
        if (i === s) {
            continue;
        }
        if (!path.has(i)) {
            output.push(-1);
            continue;
        }
        let dest = i;
        let weight = 0;
        while (dest !== s) {
            dest = path.get(dest);
            weight += 6;
        }
        output.push(weight);
    }
    return output;
}

const result = bfs(
    5,
    3,
    [
        [1, 2],
        [1, 3],
        [3, 4],
    ],
    1,
);

console.log(result);
