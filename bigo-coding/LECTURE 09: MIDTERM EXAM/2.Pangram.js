const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/LECTURE 09: MIDTERM EXAM/0.input2.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */

// const alphabetMap = {
//     a: 'a',
//     b: 'b',
//     c: 'c',
//     d: 'd',
//     e: 'e',
//     f: 'f',
//     g: 'g',
//     h: 'h',
//     i: 'i',
//     j: 'j',
//     k: 'k',
//     l: 'l',
//     m: 'm',
//     n: 'n',
//     o: 'o',
//     p: 'p',
//     q: 'q',
//     r: 'r',
//     s: 's',
//     t: 't',
//     u: 'u',
//     v: 'v',
//     w: 'w',
//     x: 'x',
//     y: 'y',
//     z: 'z',
// };

rl.on('line', function (line) {
    lines.push(line);
}).on('close', () => {
    const str = lines[1].toLowerCase();
    const strMap = str.split('').reduce((acc, c) => ({ ...acc, [c]: c }), {});

    console.log(Object.keys(strMap).length < 26 ? 'NO' : 'YES');
});
