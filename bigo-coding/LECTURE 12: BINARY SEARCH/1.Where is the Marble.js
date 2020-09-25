const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/LECTURE 12: BINARY SEARCH/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const binarySearch = (arr, value) => {
    let l = 0,
        r = arr.length - 1;
    while (l <= r) {
        mid = Math.floor((l + r) / 2);
        // if ((mid === r || value < arr[mid + 1]) && arr[mid] === value) {
        if ((mid === l || value > arr[mid + 1]) && arr[mid] === value) {
            return mid;
        }
        if (value < arr[mid]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
};

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    let t = 0;
    let count = 1;

    while (lines[t][0] !== 0 && lines[t][1] !== 0) {
        const n = lines[t][0];
        const q = lines[t][1];
        const arr = [];
        t++;

        for (let i = 0; i < n; i++) {
            arr.push(lines[t + i][0]);
        }
        t = t + n;

        console.log(`CASE# ${count}:`);

        for (let i = 0; i < q; i++) {
            const value = lines[t][0];

            const pos = binarySearch(arr, value);
            if (pos < 0) {
                console.log(`${value} not found`);
            } else {
                console.log(`${value} found at ${pos + 1}`);
            }
            t++;
        }
        count++;
    }
});
