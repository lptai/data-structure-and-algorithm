const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 09: MIDTERM EXAM/0.input6.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const isUpperCaseChar = (char) => char >= 'A' && char <= 'Z';
/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line);
}).on('close', () => {
    const str = lines[0];

    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (isUpperCaseChar(str[i])) {
            count++;
        }
    }

    console.log(count);
});
