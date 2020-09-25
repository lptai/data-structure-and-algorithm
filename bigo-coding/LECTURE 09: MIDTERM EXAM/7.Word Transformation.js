const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/LECTURE 09: MIDTERM EXAM/0.input3.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    const bananaCost = lines[0][0];
    const soldierMoney = lines[0][1];
    let soldierBananaWanted = lines[0][2];

    let cost = 0;
    while (soldierBananaWanted > 0) {
        cost = cost + bananaCost * soldierBananaWanted;
        soldierBananaWanted--;
    }

    if (cost <= soldierMoney) {
        console.log(0);
    } else {
        console.log(cost - soldierMoney);
    }
});
