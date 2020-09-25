const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day1/0.input.txt'),
    output: process.stdout,
    terminal: false,
});
const getDistance = (c1, c2) => {
    // console.log('get distance from ', c1, ' to ', c2);

    return Math.abs(c1.charCodeAt() - c2.charCodeAt());
};

let str = [];
rl.on('line', function (line) {
    str = line;
}).on('close', () => {
    let clockWise = 'a';
    let count = 0;
    let distance;

    for (let i = 0; i < str.length; i++) {
        distance = getDistance(str[i], clockWise);

        if (distance < 13) {
            count = count + distance;
        } else {
            count = count + 26 - distance;
        }
        // console.log('distance ', distance, 'str[0] ', str[0], 'clock ', clockWise, ' count: ', count);
        clockWise = str[i];
    }
    console.log(count);
});
