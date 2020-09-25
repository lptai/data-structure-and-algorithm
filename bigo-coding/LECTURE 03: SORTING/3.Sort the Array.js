const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day3/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.split(' ').map(Number));
}).on('close', () => {
    const arr = lines[1];
    const sortedArr = arr.sort((a, b) => a - b);

    let l = 0, r = 0;
    for (let i = 0, j = arr.length - 1; i < arr.length - 1 || j >= 0; i++, j--) {
        if (!l && sortedArr[i] !== arr[i]) {
            l = i;
        }
        if (!r && sortedArr[j] !== arr[j]) {
            r = j;
        }

        if (r && l) {
            break;
        }
    }

    let
    for (let i = l; i <= r - 1; i++) {
        if (a[i] < a[i]+1) {

        }
    }

    console.log('yes');
    if (l === r) {
        console.log('1 1');
    } else {
        console.log(arrSegment[0][0] + 1, arrSegment[0][arrSegment[0].length - 1] + 1);
    }
});
