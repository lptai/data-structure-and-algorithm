/**
 * https://www.spoj.com/problems/LASTSHOT/
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

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let [n, m] = read().split(' ').map(Number);

    let adjacencyList = new Map();

    for (let e = 0; e < m; e++) {
        let [u, v] = read().split(' ').map(Number);
        adjacencyList.set(u, (adjacencyList.get(u) || []).concat(v));
    }

    let parentVisited = {};

    const dfs = (u) => {
        let visited = {};
        let count = 0;
        let stack = [u];
        visited[u] = true;

        while (stack.length > 0) {
            let node = stack.pop();
            count++;

            if (!adjacencyList.has(node)) {
                continue;
            }

            for (let item of adjacencyList.get(node)) {
                if (!visited[item]) {
                    stack.push(item);
                    visited[item] = true;
                    parentVisited[item] = true;
                }
            }
        }
        return count;
    };

    let maxImpact = 0;
    for (let i = 1; i <= n; i++) {
        if (!parentVisited[i]) {
            let result = dfs(i);
            maxImpact = result > maxImpact ? result : maxImpact;
        }
    }

    console.log(maxImpact);
});
