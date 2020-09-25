const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});


const transform = (str) => {
    let result = '';
    const arr = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            result = result + str[i];
        } else if (str[i] === ')') {
            result = result + arr.pop();
        } else if (str[i] !== '(') {
            arr.push(str[i]);
        }
    }
    return result;
};
/**
 * Time complexity:
 * Space complexity:
 */
let lines = [];
rl.on('line', function (line) {
    lines.push(line);
}).on('close', () => {
    for (let i = 1; i < lines.length; i++) {
        console.log(transform(lines[i]));
    }
});
