'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 05: BFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

const combineKey = (key1, key2) => Number.parseInt((key1 * key2) % 100000);
const findMinTime = (samarpitKey, lockKey, n, otherKeys) => {
    let dist = {};
    let queue = [samarpitKey];

    while (queue.length > 0) {
        let node = queue.shift();

        for (let item of otherKeys) {
            let combinationKey = combineKey(node, item);

            if (!dist[combinationKey]) {
                queue.push(combinationKey);
                dist[combinationKey] = (dist[node] || 0) + 1;
                if (combinationKey === lockKey) {
                    return dist[combinationKey];
                }
            }
        }
    }
    return -1;
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
    let firstLine = read().split(' ').map(Number);
    let samarpitKey = firstLine[0],
        lockKey = firstLine[1];
    let n = read();
    let otherKeys = read().split(' ').map(Number);

    const result = findMinTime(samarpitKey, lockKey, n, otherKeys);
    console.log(result);
});
