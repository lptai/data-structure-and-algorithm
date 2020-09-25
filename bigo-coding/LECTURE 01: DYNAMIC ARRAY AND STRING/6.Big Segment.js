const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day1/0.input.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

rl.on('line', function (line) {
    lines.push(line.split(' ').map(Number));
}).on('close', () => {
    const arr = lines.slice(1);

    let maxSeg = -1;
    let minSeg = 1000000001;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] <= minSeg) {
            minSeg = arr[i][0];
        }
        if (arr[i][1] >= maxSeg) {
            maxSeg = arr[i][1];
        }
    }

    const foundSegment = arr.findIndex((item) => item[0] === minSeg && item[1] === maxSeg);

    console.log(foundSegment >= 0 ? foundSegment + 1 : foundSegment);
});
