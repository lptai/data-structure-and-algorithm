const direction = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const WHITE = 1;
const BLACK = 2;
/**
 * The idea is using bfs to travel the graph.
 * Step 1:, count the number of white item and push black item into a queue.
 *
 * Step 2:, using bfs to travel the queue of the black item.
 *
 * When travelsing, update the adjency from white to black, reduce the white item count.
 * In the meantime, put the new black item (item has been transfromed from white to black) to a new queue.
 *
 * Step 3: After travelsing, check the count, the black queue and the new black queue. Calculating the time here
 * Assign new black queue to the black queue. Continue the loop at step 2.
 *
 * The stop condition is white count is equal 0, and the black queue is empty
 *
 * Complexity: O(n*m)
 * Space complexity: because I use a Map to store the visited item. So the space complexity is O(n*m)
 * @param {number[n][m]} grid
 * @return {number}
 *
 */
var orangesRotting = function (grid) {
  let whiteCount = 0,
    blackQueue = [];
  (time = 0), (visited = new Map());

  const isInRange = (x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[x].length;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === WHITE) {
        whiteCount++;
      } else if (grid[i][j] === BLACK) {
        blackQueue.push({ x: i, y: j });
        visited.set(`${i}-${j}`, true);
      }
    }
  }

  let newBlackQueue = [];
  while (whiteCount && blackQueue.length > 0) {
    let node = blackQueue.shift();

    // check bottom, top, right, left direction
    for (let item of direction) {
      let [x, y] = [item.x + node.x, item.y + node.y];
      if (!visited.has(`${x}-${y}`) && isInRange(x, y) && grid[x][y] === WHITE) {
        newBlackQueue.push({ x, y });
        visited.set(`${x}-${y}`, true);
        grid[x][y] = BLACK;
        whiteCount--;
      }
    }

    if (whiteCount === 0 || (blackQueue.length === 0 && newBlackQueue.length > 0)) {
      time += 2;
      blackQueue = newBlackQueue;
      newBlackQueue = [];
    }
  }

  return whiteCount > 0 ? -1 : time;
};

const log = (result, expect) =>
  console.log(
    'Result:',
    result,
    '-',
    'Expect:',
    expect,
    '-',
    result === expect ? 'PASSED' : 'FALED',
  );


log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]),
  8,
);
log(
  orangesRotting([
    [2, 1, 1],
    [1, 0, 0],
    [0, 1, 0],
  ]),
  -1,
);
log(
  orangesRotting([
    [2, 1, 1],
    [1, 0, 0],
    [0, 1, 2],
  ]),
  4,
);
log(orangesRotting([[1], [1], [1], [1]]), -1);
log(orangesRotting([[0]]), 0);
log(orangesRotting([[0, 2]]), 0);
log(orangesRotting([[1, 2, 2]]), 2);
