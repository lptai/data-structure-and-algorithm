const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day1/0.input.txt'),
    output: process.stdout,
    terminal: false,
});

const array = [];
rl.on('line', function (line) {
    array.push(line);
}).on('close', () => {
    const items = array[1].split(' ');
    if (items.length === 1) {
        if (Number(items[0])) {
            console.log('YES');
        } else {
            console.log('NO');
        }
        return;
    }

    let nb1 = 0,
        nb2 = 0;
    for (let i = 0; i < items.length; i++) {
        if (Number(items[i]) === 0) {
            nb1++;
        } else {
            nb2++;
        }
    }
    if (nb1 === 1) {
        console.log('YES');
    } else {
        console.log('NO');
    }
});