const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

const processStruck = (struck) => {
    const stack = [];

    let neededStruck = 1;

    while (struck.length > 0 || stack.length > 0) {
        if (struck.length > 0 && struck[0] === neededStruck) {
            neededStruck++;
            struck.shift();
        } else if (stack[stack.length-1] === neededStruck) {
            stack.pop();
            neededStruck++;
        } else {
            if (struck.length === 0) {
                console.log('no');
                return;
            }
            stack.push(struck[0]);
            struck.shift();
        }
    }
    console.log('yes');
};
let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    let count = 1;
    while (lines[count] && lines[count][0] > 0) {
        processStruck(lines[count]);
        count = count + 2;
    }
});
