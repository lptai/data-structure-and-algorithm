const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day2/0.input1.json'),
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
    const k = lines[0][1];
    const arr = lines[1];

    let resultArr = [0];
    let map = { [arr[0]]: true };
    let count = 0;
    let countDistinceItem = 1;
    for (let i = 1; i < arr.length; i++) {
        if (countDistinceItem === k) {
            break;
        }

        if (!map[arr[i]]) {
            countDistinceItem++;
        }
        map[arr[i]] = true;
        resultArr.push(i);

        if (arr[i] === arr[resultArr[count]]) {
            count++;
            for (let j = count + 1; j < resultArr.length; j++) {
                if(arr[j] === arr[resultArr[count]]) {
                    count++;
                } else {
                    break;
                }
            }
        }
    }

    if (countDistinceItem < k) {
        console.log(-1, -1);
    } else {
        console.log(resultArr[count] + 1, resultArr[resultArr.length - 1] + 1);
    }
});
