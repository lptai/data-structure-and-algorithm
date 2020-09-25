/**
 * https://www.hackerearth.com/practice/algorithms/graphs/depth-first-search/practice-problems/algorithm/bishu-and-his-girlfriend/
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

const dfs = (adjacencyList, v) => {
    let path = { [v]: 0 },
        stack = [v];

    while (stack.length > 0) {
        let node = stack.pop();
        if (!adjacencyList.has(node)) {
            continue;
        }
        for (let item of adjacencyList.get(node)) {
            if (path[item] === undefined) {
                path[item] = path[node] + 1;
                stack.push(item);
            }
        }
    }

    return path;
};

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
    let n = Number(read());

    let adjacencyList = new Map();

    for (let i = 0; i < n-1; i++) {
        let [u, v] = read().split(' ').map(Number);
        let uAdj = adjacencyList.get(u) || [],
            vAdj = adjacencyList.get(v) || [];
        uAdj.push(v);
        vAdj.push(u);
        adjacencyList.set(v, vAdj);
        adjacencyList.set(u, uAdj);
    }

    const path = dfs(adjacencyList, 1);
    let chosenGirl = 1;
    path[chosenGirl] = Number.MAX_SAFE_INTEGER; // default value

    let q = Number(read());
    for (let i = 0; i < q; i++) {
        const girl = Number(read());
        if (path[girl] > path[chosenGirl]) {
            continue;
        }
        if (path[girl] < path[chosenGirl] || girl < chosenGirl) {
            chosenGirl = girl;
        }
    }

    console.log(chosenGirl);
});
