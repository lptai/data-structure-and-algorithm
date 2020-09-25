/**
 * https://codeforces.com/problemset/problem/279/B
 */
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day2/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

const getPivot = (l, r) => Math.floor((l + r) / 2);
const binarySearch = (sumArr, start, remaining) => {
    let left = start,
        right = sumArr.length - 1,
        pivot = getPivot(left, right);
    const sumStart = sumArr[start];


    return pivot;
};

let lines = [];
/**
 * Time complexity: O(nlogn)
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.split(' ').map(Number));
}).on('close', () => {
    const t = lines[0][1];
    const books = lines[1];

    let sumArr = [books[0]];
    for (let i = 1; i < books.length; i++) {
        sumArr.push(sumArr[i - 1] + books[i]);
    }

    let maxCount = 0;
    for (let i = 0; i < sumArr.length; i++) {
        const remaining = t - books[i];
        const pivot = binarySearch(sumArr, i, remaining);
        let bookCount = pivot - i + 1;
        console.log('i ', i, 'pivot ', pivot, ' bookCount ', bookCount);

        if (bookCount > maxCount) {
            maxCount = bookCount;
        }
    }

    console.log(maxCount);
});
