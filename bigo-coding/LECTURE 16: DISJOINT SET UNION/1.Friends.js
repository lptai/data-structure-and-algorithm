const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];
const parent = [];

const makeSet = () => {
    for (let i = 1; i <= 500000; i++) {
        parent[i] = i;
    }
};

const findSet = (u) => {
    while (u !== parent[u]) {
        u = parent[u];
    }

    return u;
};

const unionSet = (u, v) => {
    const up = findSet(u);
    const vp = findSet(v);

    parent[up] = vp;
};



// Can be solved by dfs / bfs or dju
/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ')).map(Number);
}).on('close', () => {
    let count = 0;
    const nbOfTest = lines[count][0];
    count++;

    while (count < lines.length) {
        const n = lines[count][0];
        const m = lines[count][1];

        for (let i = 0; i < m; i++) {

        }
    }
});
