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
    const chapters = lines[1].sort((a, b) => a - b);
    let hour = lines[0][1];

    let total = 0;
    for (let i = 0; i < chapters.length; i++) {
        total = total + chapters[i] * hour;
        if (hour > 1) {
            hour--;
        }
    }
    console.log(total);

});
