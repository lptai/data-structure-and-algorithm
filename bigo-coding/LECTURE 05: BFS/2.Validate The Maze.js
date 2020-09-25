'use strict';

/**
 * https://www.spoj.com/problems/MAKEMAZE/
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
let currentLine = 0;

const validateMaze = (maze, row, col) => {
    let sideRow = [0, row - 1],
        sideCol = [0, col - 1];

    const isInRange = (x, y) => x >= 0 && y >= 0 && x < row && y < col;
    const isAtSide = (x, y) => sideRow.indexOf(x) > -1 || sideCol.indexOf(y) > -1;
    const direction = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    const sideNode = new Map();
    let isValid = false;

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            const currentKey = `${r}-${c}`;
            if (sideNode.has(currentKey) || maze[r][c] !== '.' || !isAtSide(r, c)) {
                continue;
            }

            const path = new Map(),
                visited = new Map(),
                queue = [{ x: r, y: c }];

            visited.set(currentKey, true);
            sideNode.set(currentKey, { x: r, y: c });

            while (queue.length > 0) {
                let node = queue.shift();
                for (let item of direction) {
                    let x = item[0] + node.x,
                        y = item[1] + node.y;
                    let key = `${x}-${y}`;

                    if (isInRange(x, y) && !visited.has(key) && maze[x][y] === '.') {
                        visited.set(key, true);
                        path.set(key, node);
                        queue.push({ x, y });

                        if (isAtSide(x, y)) {
                            sideNode.set(key, { x, y });
                        }
                    }
                }
            }

            if (sideNode.size > 2) {
                return 'invalid';
            }

            // Check there is exist a way from entry to exit
            for (let [key, { x, y }] of sideNode) {
                if ((x !== r || y !== c) && path.has(`${x}-${y}`)) {
                    isValid = true;
                }
            }
        }
    }

    if (sideNode.size !== 2 || !isValid) {
        return 'invalid';
    }

    return 'valid';
};

/**
 * Time complexity: O (Q * M * N)
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    const read = () => lines[currentLine++];
    let q = Number(read());

    for (let i = 0; i < q; i++) {
        let [row, col] = read().split(' ').map(Number);

        const maze = [];
        for (let r = 0; r < row; r++) {
            maze.push(read());
        }

        const result = validateMaze(maze, row, col);
        console.log(result);
    }
});
