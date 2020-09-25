const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' '));
}).on('close', () => {
    let iterator = 0;
    let i = iterator + 1;
    let p = Number(lines[iterator][0]);
    let c = Number(lines[iterator][1]);
    let count = 1;
    while (p > 0 && c > 0) {
        console.log(`Case ${count}:`);

        let queue = [];
        let patient = 1;
        for (let i = 1; i <= Math.min(p, c); i++) {
            queue.push(patient);
            patient++;
        }
        while (i <= c + iterator) {
            if (lines[i][0] === 'N') {
                let p = queue.shift();
                queue.push(p); // push back to the top
                console.log(p);
            } else {
                let e = Number(lines[i][1]);
                for (let idx = 0; idx < queue.length; idx++) {
                    if (queue[idx] === e) {
                        queue.splice(idx, 1);
                        break;
                    }
                }
                queue.unshift(e);
            }

            i++;
        }
        count++;
        iterator = i++;
        p = Number(lines[iterator][0]);
        c = Number(lines[iterator][1]);
    }
});
