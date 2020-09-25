/**
 * https://codeforces.com/problemset/problem/723/D
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

const lines = [];
let currentLine = 0;

const direction = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];
/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let [rows, columns, k] = read().split(' ').map(Number);

    const isInRange = ({ x, y }) => x >= 0 && y >= 0 && x <= rows - 1 && y <= columns - 1;
    const isOnBorder = ({ x, y }) => [0, rows - 1].indexOf(x) > -1 || [0, columns - 1].indexOf(y) > -1;

    let visited = {};
    let matrix = [];
    let lakes = [];
    for (let row = 0; row < rows; row++) {
        matrix.push(read().split(''));
    }
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < columns - 1; col++) {
            let key = `${row}-${col}`;
            if (matrix[row][col] !== '.' || visited[key]) {
                continue;
            }

            let stack = [{ x: row, y: col }],
                isLake = true,
                lake = [{ x: row, y: col }];

            visited[key] = true;

            while (stack.length > 0) {
                let node = stack.pop();

                for (let d of direction) {
                    let [x, y] = [node.x + d.x, node.y + d.y];
                    let dKey = `${x}-${y}`;
                    if (!visited[dKey] && isInRange({ x, y }) && matrix[x][y] === '.') {
                        visited[dKey] = true;
                        stack.push({ x, y });
                        lake.push({ x, y });

                        if (isOnBorder({ x, y })) {
                            isLake = false;
                        }
                    }
                }
            }
            if (isLake) {
                lakes.push(lake);
            }
        }
    }

    lakes.sort((a, b) => a.length - b.length);
    let count = 0;
    for (let i = lakes.length; i > k; i--) {
        let lake = lakes.shift();
        count += lake.length;
        lake.forEach(({ x, y }) => (matrix[x][y] = '*'));
    }
    console.log(count);
    console.log(matrix.map((row) => row.join('')).join('\n'));
});
