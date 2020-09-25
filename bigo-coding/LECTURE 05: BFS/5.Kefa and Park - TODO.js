/**
 * https://codeforces.com/problemset/problem/580/C
 * TODO optimize
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

let lines = [];
let currentLine = 0;

/**
 * Time complexity: TODO
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    const [n, m] = read().split(' ').map(Number);
    const vertices = read().split(' ').map(Number);
    const adjacencies = new Map();

    for (let i = 1; i < n; i++) {
        const [u, v] = read().split(' ').map(Number);
        adjacencies.set(u, (adjacencies.get(u) || []).concat(v));
        adjacencies.set(v, (adjacencies.get(v) || []).concat(u));
    }

    let node = 1,
        count = 0;
    const queue = [node],
        visited = { [node]: true };

    while (queue.length > 0) {
        node = queue.shift();

        let isLeaf = true;
        for (const item of adjacencies.get(node)) {
            if (visited[item]) {
                continue;
            }
            let idx = item - 1;
            isLeaf = false;
            visited[item] = true;
            vertices[idx] = vertices[idx] === 0 ? 0 : vertices[idx] + vertices[node - 1];
            if (vertices[idx] <= m) {
                queue.push(item);
            }
        }

        if (isLeaf && vertices[node - 1] <= m) {
            count++;
        }
    }
    console.log(count);
});
