const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day1/0.input.json'),
    output: process.stdout,
    terminal: false,
});

let arr = [];

rl.on('line', function (line) {
    arr.push(line.split(' '));
}).on('close', () => {
    const k = Number(arr[1][0]);
    const m = Number(arr[1][1]);
    const arr1 = arr[2];
    const arr2 = arr[3];

    const items1 = arr1.slice(0, k);
    const items2 = arr2.slice(arr2.length - m);

    if (Number(items1[k - 1]) >= Number(items2[0])) {
        console.log('NO');
    } else {
        console.log('YES');
    }
});
