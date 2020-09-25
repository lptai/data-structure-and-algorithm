/**
 * https://leetcode.com/problems/rotting-oranges/
 */
const direction = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
];

const FRESH = 1;
const ROTTEN = 2;
/**
 * Complexity O(n*m)
 * @param {number[n][m]} grid
 * @return {number}
 *
 */
var orangesRotting = function (grid) {

    let fresh = 0;
    let rottenQueue = [];

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === ROTTEN) {
                rottenQueue.push({ x, y });
            } else if (grid[x][y] === FRESH) {
                fresh++;
            }
        }
    }

    let count = 0;
    while (fresh && rottenQueue.length > 0) {
        // find neighbor of the rotten orange
        let nextQueue = [];
        while (rottenQueue.length > 0) {
            let node = rottenQueue.shift();

            for (let item of direction) {
                let [x, y] = [item.x + node.x, item.y + node.y];
                if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length) {
                    continue;
                }
                if (grid[x][y] === FRESH) {
                    grid[x][y] = ROTTEN;
                    fresh--;
                    nextQueue.push({ x, y });
                }
            }
        }
        rottenQueue = nextQueue;
        count++;
    }

    return fresh ? -1 : count === 0 ? 0 : count;
};

console.log(
    orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
    ]),
    4,
);
console.log(orangesRotting([[1], [1], [1], [1]]), -1);
console.log(orangesRotting([[0, 2]]), 0);
console.log(orangesRotting([[1, 2]]), 1);
console.log(orangesRotting([[0]]), 0);
