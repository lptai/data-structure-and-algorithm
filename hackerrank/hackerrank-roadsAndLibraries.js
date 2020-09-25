/**
 * Roads and Libraries
 * https://www.hackerrank.com/challenges/torque-and-development/problem
 * Complexity O (v + e)
 * @param {*} n
 * @param {*} c_lib
 * @param {*} c_road
 * @param {*} cities
 */
function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_lib < c_road) {
        return c_lib * n;
    }

    const adjacencyList = new Map();

    for (let [u, v] of cities) {
        let uAdj = adjacencyList.get(u) || [],
            vAdj = adjacencyList.get(v) || [];
        uAdj.push(v);
        vAdj.push(u);
        adjacencyList.set(u, uAdj);
        adjacencyList.set(v, vAdj);
    }

    let visitedParent = {};
    let count = 0;
    for (let v = 1; v <= n; v++) {
        if (visitedParent[v]) {
            continue;
        }
        count++;
        let visited = { [v]: true };
        let queue = [v];

        while (queue.length > 0) {
            let node = queue.shift();
            if (!adjacencyList.has(node)) {
                continue;
            }
            for (let item of adjacencyList.get(node)) {
                if (!visited[item]) {
                    visited[item] = true;
                    visitedParent[item] = true;
                    queue.push(item);
                }
            }
        }
    }
    return count * c_lib + c_road * (n - count);
}

console.log(
    roadsAndLibraries(5, 6, 1, [
        [1, 2],
        [1, 3],
        [1, 4],
    ]),
);
