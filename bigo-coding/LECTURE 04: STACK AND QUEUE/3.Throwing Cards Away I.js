const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

const transform = (nb) => {
    const discardedCards = [];
    const stack = [];
    for (let i = 1; i <= nb; i++) {
        stack.push(i);
    }

    while (stack.length > 1) {
        let discardedItem = stack.shift();
        let topItem = stack.shift();
        discardedCards.push(discardedItem);
        stack.push(topItem);
    }
    if (discardedCards.length > 0) {

        console.log('Discarded cards:', discardedCards.join(', '));
    } else {
        console.log('Discarded cards:');
    }
    console.log('Remaining card:', stack[0]);
};

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(Number(line));
}).on('close', () => {
    for (let i = 0; i < lines.length - 1; i++) {
        transform(lines[i]);
    }
});
