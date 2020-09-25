/**
 * https://leetcode.com/problems/number-of-islands/
 */

const direction = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
];

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
    let visited = {};
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] != 1 || visited[`${row}-${col}`]) {
                continue;
            }
            let queue = [[row, col]];
            visited[`${row}-${col}`] = true;

            while (queue.length > 0) {
                let node = queue.shift();
                for (let d of direction) {
                    let [x, y] = [node[0] + d[0], node[1] + d[1]];
                    if (x >= 0 && x < grid.length && y >= 0 && y < grid[row].length) {
                        if (grid[x][y] == 1 && !visited[`${x}-${y}`]) {
                            visited[`${x}-${y}`] = true;
                            queue.push([x, y]);
                        }
                    }
                }
            }
            count++;
        }
    }
    return count;
};

// console.log(
//     numIslands([
//         ['1', '1', '1', '1', '0'],
//         ['1', '1', '0', '1', '0'],
//         ['1', '1', '0', '0', '0'],
//         ['0', '0', '0', '0', '0'],
//     ]),
//     1,
// );

console.log(
    numIslands([
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
    ]),
    3,
);

console.log(
    numIslands([
        ['0', '1', '0'],
        ['1', '0', '1'],
        ['0', '1', '0'],
    ]),
    4,
);
