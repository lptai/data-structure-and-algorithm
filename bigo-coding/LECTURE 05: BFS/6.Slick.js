/**
 * https://www.spoj.com/problems/UCV2013H/
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

const getSlickResult = (matrix, row, col) => {
    const visited = {};
    const slickMap = {};
    const isInRange = ({ x, y }) => x >= 0 && x < row && y >= 0 && y < col;
    let count = 0;

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if (visited[`${r}-${c}`] || matrix[r][c] == 0) {
                continue;
            }

            visited[`${r}-${c}`] = true;

            let queue = [{ x: r, y: c }];
            let slickCount = 1;

            while (queue.length > 0) {
                let node = queue.pop();

                for (let item of direction) {
                    const [x, y] = [node.x + item.x, node.y + item.y];
                    const key = `${x}-${y}`;
                    if (isInRange({ x, y }) && matrix[x][y] == 1 && !visited[key]) {
                        visited[key] = true;
                        queue.push({ x, y });
                        slickCount++;
                    }
                }
            }
            count++;
            slickMap[slickCount] = (slickMap[slickCount] || 0) + 1;
        }
    }

    return {
        count,
        slickMap,
    };
};

/**
 * Time complexity: O (V)
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];

    let [row, col] = read().split(' ').map(Number);

    while (row > 0 && col > 0) {
        const matrix = [];
        for (let r = 0; r < row; r++) {
            matrix.push(read().split(' ').map(Number));
        }

        const { count, slickMap } = getSlickResult(matrix, row, col);
        console.log(count);
        for (const [key, value] of Object.entries(slickMap)) {
            console.log(`${key} ${value}`);
        }
        [row, col] = read().split(' ').map(Number);
    }
});
