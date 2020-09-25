const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day1/0.input.json'),
    output: process.stdout,
    terminal: false,
});

let strArr = [];

rl.on('line', function (line) {
    strArr.push(line);
}).on('close', () => {
    const s = strArr[0];
    const t = strArr[1];

    const sArr = s.split('');
    for (let i = sArr.length - 1; i >= 0; i--) {
        if (sArr[i] === 'z') {
            sArr[i] = 'a';
        } else {
            sArr[i] = String.fromCharCode(sArr[i].charCodeAt() + 1);
            break;
        }
    }

    const foundStr = sArr.join('');
    console.log(foundStr === t ? 'No such string' : foundStr);
});
