const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day3/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.split(' ').map(Number));
}).on('close', () => {
    const n = lines[0][0];
    const a = lines[0][1];
    const arr = lines[1];

    arr.sort((a, b) => a - b);

    console.log(arr[n-a]-arr[n-a-1]);
});
