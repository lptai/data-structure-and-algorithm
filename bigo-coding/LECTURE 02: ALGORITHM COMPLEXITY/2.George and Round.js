const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day2/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity: O(a.length)
 * Space complexity: 0(1)
 */
rl.on('line', function (line) {
    lines.push(line.split(' ').map(Number));
}).on('close', () => {
    const a = lines[1];
    const b = lines[2];

    let count = 0;
    let bIdx = a.length - 1;

    for (let i = b.length - 1; i > -1; ) {
        if (bIdx < 0) {
            break;
        }
        if (b[i] >= a[bIdx]) {
            i--;
            count++;
        }
        bIdx--;
    }

    console.log(a.length - count);
});
