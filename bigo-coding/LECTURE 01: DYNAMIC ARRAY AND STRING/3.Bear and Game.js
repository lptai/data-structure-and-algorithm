const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day1/0.input.txt'),
    output: process.stdout,
    terminal: false,
});

let arr = [];
rl.on('line', function (line) {
    arr = line.split(' ');
}).on('close', () => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {

        // console.log('count ', count, ' + 15  ', count + 15, ' arr[i] ', arr[i])
        if (count + 15 < Number(arr[i])) {
            console.log(count + 15);
            return;
        }
        count = Number(arr[i]);
    }

    if (count + 15 > 90) {
        console.log(90)
    } else {
        console.log(count + 15);
    }
});
