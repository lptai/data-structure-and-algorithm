const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day1/0.input.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity O(Max(t.length, s.length))
 * Space complexity O(Max(t.length, s.length))
 */
rl.on('line', function (line) {
    lines.push(line);
}).on('close', () => {
    const s = lines[0];
    const t = lines[1];

    const tArr = t.split('');
    const sArr = s.split('');

    const mapS = sArr.reduce(
        (acc, c) => ({
            ...acc,
            [c]: (acc[c] || 0) + 1,
        }),
        {},
    );

    if (tArr.some((c) => !mapS[c])) {
        console.log('need tree');
        return;
    }

    if (t.length === s.length) {
        console.log('array');
        return;
    }

    let foundIdx = -1;
    for (let i = 0; i < tArr.length; i++) {
        foundIdx = s.indexOf(tArr[i], foundIdx);

        if (foundIdx < 0) {
            console.log('both');
            return;
        }
    }

    console.log('automaton');
});
