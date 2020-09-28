/**
 * https://leetcode.com/problems/count-servers-that-communicate/
 *
 * You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there
 * is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the
 * same column.
 *
 * Return the number of servers that communicate with any other server.
 *
 * Complexity: O(n^2*m^2) todo
 * Space: O(n*m)
 * @param {number[][]} grid
 * @return {number}
 */
/** Solution 1
var countServers = function (grid) {
  const key = (x, y) => `${x}-${y}`;
  const visited = {};

  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (visited[key(i, j)] || grid[i][j] === 0) {
        continue;
      }
      const queue = [{ x: i, y: j }];
      visited[key(i, j)] = true;
      let isConnected = false;

      while (queue.length > 0) {
        let { x, y } = queue.shift();

        for (let k = 0; k < grid.length; k++) {
          if (!visited[key(k, y)] && grid[k][y] === 1) {
            visited[key(k, y)] = true;
            queue.push({ x: k, y });
            isConnected = true;
            count++;
          }
        }

        for (let k = 0; k < grid[x].length; k++) {
          if (!visited[key(x, k)] && grid[x][k] === 1) {
            visited[key(x, k)] = true;
            queue.push({ x, y: k });
            isConnected = true;
            count++;
          }
        }
      }
      if (isConnected) {
        count++;
      }
    }
  }
  return count;
};
**/

/**
 * Solution 2
 * @param {*} grid
 */
const countServers = (grid) => {
  let queue = [];
  const rowMap = {},
    colMap = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 1) {

      }
    }
  }
};

console.log(
  countServers([
    [0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 1, 1],
    [0, 0, 1, 1, 0],
  ]),
  12,
);
console.log(
  countServers([
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 1],
  ]),
  5,
);

console.log(
  countServers([
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ]),
  2,
);

console.log(
  countServers([
    [1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
  ]),
  3,
);
