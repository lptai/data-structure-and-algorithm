const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const calculate = (arr) => {
    const sortedArr = arr.map((value, idx) => ({ value, idx: idx + 1 })).sort((a, b) => a.value - b.value);

    const result = [];
    const originalSorted = [sortedArr[0].idx];

    for (let i = 0; i < sortedArr.length - 1; i++) {
        originalSorted.push(sortedArr[i + 1].idx);
        if (sortedArr[i].value === sortedArr[i + 1].value) {
            const newArr = [];
            // clone a new arr
            for (let j = 0; j < sortedArr.length; j++) {
                if (j !== i) {
                    newArr.push(sortedArr[j].idx);
                } else {
                    newArr.push(sortedArr[j + 1].idx);
                    newArr.push(sortedArr[j].idx);
                    j++;
                }
            }
            result.push(newArr);
        }
    }

    result.push(originalSorted);
    return result;
};

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    const arr = lines[1];

    if (arr.length < 3) {
        console.log('NO');
    }

    const result = calculate(arr);

    if (result && result.length >= 3) {
        console.log('YES');
        result.forEach((item) => console.log(item.join(' ')));
    } else {
        console.log('NO');
    }
});
