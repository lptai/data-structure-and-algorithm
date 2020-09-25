const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' '));
}).on('close', () => {


});