'use strict';
let C = (k, n) => {
    if (k == 0 || k == n) return 1;
    if (k == 1) return n;
    return C(k - 1, n - 1) + C(k, n - 1);
};

/**
 * https://www.hackerrank.com/challenges/journey-to-the-moon/problem
 * @param {*} n
 * @param {*} astronaut
 */
function journeyToMoon(n, astronaut) {
    let adjacencyList = new Map();
    for (let [u, v] of astronaut) {
        let uAdj = adjacencyList.get(u) || [],
            vAdj = adjacencyList.get(v) || [];
        uAdj.push(v);
        vAdj.push(u);
        adjacencyList.set(u, uAdj);
        adjacencyList.set(v, vAdj);
    }

    let parentVisited = {},
        count = 0,
        verticles = [];
    for (let i = 0; i < n; i++) {
        if (parentVisited[i]) {
            continue;
        }
        count++;

        let visited = { [i]: true },
            queue = [i];

        let verticlesCount = 1;
        while (queue.length > 0) {
            let node = queue.shift();
            if (!adjacencyList.has(node)) {
                continue;
            }
            for (let item of adjacencyList.get(node)) {
                if (!visited[item]) {
                    queue.push(item);
                    parentVisited[item] = true;
                    visited[item] = true;
                    verticlesCount++;
                }
            }
        }
        verticles.push(verticlesCount);
    }

    let nbOfPair = 0;
    let remaining = n;
    for (let i = 0; i < verticles.length; i++) {
        let nbOfVerticles = verticles[i];
        remaining = remaining - nbOfVerticles;
        nbOfPair = nbOfPair + nbOfVerticles * C(1, remaining);
    }

    return nbOfPair;
}

console.log(journeyToMoon(4, [[0, 2]]));
