const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const map = {
    C: 12,
    O: 16,
    H: 1,
};
/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', () => {
    let str = lines[0];
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            stack.push(str[i]);
        } else if (str[i] === ')') {
            let total = 0;
            let item = stack.pop();
            while (item !== '(') {
                total = total + item;
                item = stack.pop();
            }
            stack.push(total);
        } else if (['C', 'H', 'O'].indexOf(str[i]) > -1) {
            stack.push(map[str[i]]);
        } else {
            let item = stack.pop();
            stack.push(item * Number(str[i]));
        }
    }
    console.log(stack.reduce((acc, item) => acc + item, 0));
});
