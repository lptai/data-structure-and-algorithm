/**
 *
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    input: fs.createReadStream('bigo-coding/LECTURE 05: BFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];
let currentLine = 0;

const direction = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
];

const LAND = '.';
const WATER = '#';
const PRINCE = '@';

const bfs = (matrix, start, rows, cols) => {
    let visited = { [`${start.x}-${start.y}`]: true };
    let queue = [start];
    let count = 1;

    const isInRange = ({ x, y }) => x >= 0 && y >= 0 && x < rows && y < cols;

    while (queue.length > 0) {
        let node = queue.shift();

        for (let item of direction) {
            let [x, y] = [item.x + node.x, item.y + node.y];
            let key = `${x}-${y}`;
            if (isInRange({ x, y }) && matrix[x][y] === LAND && !visited[key]) {
                visited[key] = true;
                queue.push({ x, y });
                count++;
            }
        }
    }
    return count;
};

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let q = Number(read());

    for (let i = 1; i <= q; i++) {
        let prince = null;
        const matrix = [];
        const [cols, rows] = read().split(' ').map(Number);
        for (let r = 0; r < rows; r++) {
            const row = read();
            const mRow = [];
            for (let c = 0; c < cols; c++) {
                if (PRINCE === row[c]) {
                    prince = { x: r, y: c };
                }
                mRow.push(row[c]);
            }
            matrix.push(mRow);
        }

        const result = bfs(matrix, prince, rows, cols);
        console.log(`Case ${i}:`, result);
    }
});
