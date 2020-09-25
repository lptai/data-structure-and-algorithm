const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const verifyLogestPrefix = (str) => {
    const stack = [];
    let lognestLength = 0;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '>') {
            if (stack.length === 0) {
                break;
            }
            stack.pop();
            length += 2;
        } else {
            stack.push(str[i]);
        }
        if (stack.length === 0) {
            lognestLength = lognestLength + length;
            length = 0;
        }
    }
    return lognestLength;
};
/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    for (let i = 1; i < lines.length; i++) {
        console.log(verifyLogestPrefix(lines[i]));
    }
});
