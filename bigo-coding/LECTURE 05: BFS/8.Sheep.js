/**
 * https://www.spoj.com/problems/KOZE/
 */
'use strict';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 05: BFS/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

const direction = [
    {
        x: -1,
        y: 0,
    },
    {
        x: 1,
        y: 0,
    },
    {
        x: 0,
        y: 1,
    },
    {
        x: 0,
        y: -1,
    },
];
let lines = [];
let currentLine = 0;

const FANCE = '#';
const WOLF = 'v';
const SHEEP = 'k';
/**
 * Time complexity: O (row*col)
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let [rows, cols] = read().split(' ').map(Number);

    const matrix = [];
    for (let row = 0; row < rows; row++) {
        matrix.push(read());
    }

    const isInRange = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;
    const key = (x, y) => `${x}-${y}`;
    const visited = {};
    let surviveWolf = 0,
        surviveSheep = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (FANCE === matrix[i][j] || visited[key(i, j)]) {
                continue;
            }

            visited[key(i, j)] = true;
            const queue = [{ x: i, y: j }];
            let wolf = matrix[i][j] === WOLF ? 1 : 0,
                sheep = matrix[i][j] === SHEEP ? 1 : 0;
            let isNotInSector = false;

            while (queue.length > 0) {
                let node = queue.shift();

                for (let d of direction) {
                    let [x, y] = [d.x + node.x, d.y + node.y];
                    if (isInRange(x, y) && !visited[key(x, y)] && FANCE !== matrix[x][y]) {
                        queue.push({ x, y });
                        visited[key(x, y)] = true;
                        if (matrix[x][y] === WOLF) {
                            wolf++;
                        } else if (matrix[x][y] === SHEEP) {
                            sheep++;
                        }
                    } else if (!isInRange(x, y)) {
                      isNotInSector = true;
                    }
                }
            }
            if (wolf >= sheep || isNotInSector) {
                surviveWolf += wolf;
            }
            if (sheep > wolf || isNotInSector) {
                surviveSheep += sheep;
            }
        }
    }

    console.log(surviveSheep, surviveWolf);
});
