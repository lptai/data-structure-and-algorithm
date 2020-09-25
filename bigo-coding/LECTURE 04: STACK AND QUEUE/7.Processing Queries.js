const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    // input: fs.createReadStream('bigo-coding/day4/0.input1.json'),
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
    const length = lines[0][0];
    const maxQueue = lines[0][1];
    let freeMoment = 0;
    let momentQueue = [];

    const ableToPutInQueue = (t, queue) => {
        let l = 0,
            r = queue.length - 1;
        let pivot;

        if (l === r) {
            // l === r === 0
            return maxQueue >= 1;
        }

        if (r - l === 1) {
            if (t >= queue[l]) {
                return maxQueue >= 1;
            } else {
                return maxQueue >= 2;
            }
        }

        while (true) {
            pivot = Math.floor((l + r) / 2);
            if (queue[pivot] === t) {
                return queue.length - pivot - 1 <= maxQueue;
            }

            if (r - l === 1) {
                if (queue[l] > t) {
                    return queue.length - l <= maxQueue;
                }
                return queue.length - pivot - 1 <= maxQueue;
            }

            if (queue[pivot] >= t) {
                r = pivot;
            } else {
                l = pivot;
            }
        }
    };
    // const ableToPutInQueue = (t, queue) => {
    //     let count = 0;
    //     for (let i = queue.length - 1; i >= 0; i--) {
    //         if (queue[i] > t) {
    //             count++;
    //         }
    //         if (count > maxQueue) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    for (let i = 1; i <= length; i++) {
        let t = lines[i][0];
        let d = lines[i][1];
        // is server free --> process
        // is server busy, and queue is not full --> push into the queue
        if (t > freeMoment) {
            freeMoment = t + d;
        } else if (ableToPutInQueue(t, momentQueue)) {
            freeMoment = freeMoment + d;
        } else {
            console.log(-1);
            continue;
        }
        console.log(freeMoment);
        momentQueue.push(freeMoment);
    }
});
