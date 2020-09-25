/**
 * https://leetcode.com/problems/number-of-enclaves/
 *
 * Given a 2D array A, each cell is 0 (representing sea) or 1 (representing land)
 * A move consists of walking from one land square 4-directionally to another land square, or off the boundary of the grid.
 * Return the number of land squares in the grid for which we cannot walk off the boundary of the grid in any number of moves.
 * Example 1:
 * Input: [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
 * Output: 3
 * Explanation:
 * There are three 1s that are enclosed by 0s, and one 1 that isn't enclosed because its on the boundary.
 * @param {number[][]} A
 * @return {number}
 */

const DIRECTION = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];
var numEnclaves = function (A) {
  const visited = {};

  const key = (x, y) => `${x}-${y}`;
  const isInRange = (x, y) => x >= 0 && y >= 0 && x < A.length && y < A[x].length;
  let sum = 0;

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if (A[i][j] == 0 || visited[key(i, j)]) {
        continue;
      }

      const stack = [{ x: i, y: j }];
      visited[key(i, j)] = true;
      let boundary = (x, y) => x === 0 || y === 0 || x === A.length - 1 || y === A[0].length - 1;
      let isOnBound = boundary(i, j);
      let count = isOnBound ? 0 : 1;

      while (stack.length > 0) {
        let node = stack.pop();

        for (let item of DIRECTION) {
          const [x, y] = [item.x + node.x, item.y + node.y];
          if (isInRange(x, y) && !visited[key(x, y)] && A[x][y] == 1) {
            stack.push({ x, y });
            visited[key(x, y)] = true;
            isOnBound = isOnBound || boundary(x, y);
            if (!isOnBound) {
              count++;
            } else {
              count = 0;
            }
          }
        }
      }
      sum += count;
    }
  }
  return sum;
};

console.log(
  numEnclaves([
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
  ]),
  2,
);

console.log(
  numEnclaves([
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ]),
  0,
);

console.log(
  numEnclaves([
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  ]),
  3,
);

console.log(
  numEnclaves([
    [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  ]),
  8,
);
