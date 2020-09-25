const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    const n = lines[0][0];
    const graph = {};

    let noOneKnow = true;
    // cover edge case, no one know any language
    for (let i = 1; i <= n; i++) {
        if (lines[i][0] > 0) {
            noOneKnow = false;
        }
    }
    if (noOneKnow) {
        console.log(n);
        return;
    }

    for (let i = 1; i < lines.length; i++) {
        lines[i].shift();
        graph[`${i}E`] = (graph[`${i}E`] || []).concat(lines[i]);
        for (let j = 0; j < lines[i].length; j++) {
            graph[lines[i][j]] = (graph[lines[i][j]] || []).concat(`${i}E`);
        }
    }

    const visited = {};
    for (let v in graph) {
        visited[v] = false;
    }

    const bfs = (s, graph) => {
        const queue = [s];

        while (queue.length > 0) {
            const u = queue.shift();
            for (let i = 0; i < graph[u].length; i++) {
                const v = graph[u][i];
                if (!visited[v]) {
                    visited[v] = true;
                    queue.push(v);
                }
            }
        }
    };

    let count = 0;
    for (let i = 1; i <= n; i++) {
        if (!visited[`${i}E`]) {
            count++;
            bfs(`${i}E`, graph);
        }
    }

    console.log(count - 1);
});

// TODO try with dsu