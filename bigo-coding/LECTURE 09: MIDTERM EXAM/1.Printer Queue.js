const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/LECTURE 09: MIDTERM EXAM/0.input1.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;
class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    size() {
        return this._heap.length;
    }

    isNotEmpty() {
        return this.size() > 0;
    }

    peek() {
        return this._heap[top];
    }

    push(...values) {
        values.forEach((value) => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    replace(value) {
        const replacedValue = this.peek();
        this._heap[top] = value;
        this._siftDown();
        return replacedValue;
    }

    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    _siftUp() {
        let node = this.size() - 1;
        while (node > top && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    }
    _siftDown() {
        let node = top;
        while (
            (left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))
        ) {
            let maxChild =
                right(node) < this.size() && this._greater(right(node), left(node))
                    ? right(node)
                    : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}


const calculatePrinterQueue = ({ n, m, arr }) => {
    const printers = arr.map((item, idx) => ({ name: `item-${idx}` , cost: item }));
    let item = printers[m];
    const pq = new PriorityQueue((a, b) => a.cost >= b.cost);
    printers.forEach(item => pq.push(item));

    let count = 0;
    while(true) {
        const top = printers.shift();
        const highest = pq.peek();
        if (highest.cost <= top.cost) {
            pq.pop();
        } else {
            // push back to the top
            printers.push(top);
        }
        if (top.name === item.name) {
            break;
        }
        count++;
    }
    return count;
};

/**
 * Time complexity:
 * Space complexity:
 */
rl.on('line', function (line) {
    lines.push(line.trim().split(' ').map(Number));
}).on('close', () => {
    const nbOfTest = lines[0][0];
    const testcases = [];

    for (i = 1; i <= nbOfTest * 2; i += 2) {
        let testcase = {
            n: lines[i][0],
            m: lines[i][1],
            arr: lines[i + 1],
        };
        testcases.push(testcase);
    }

    testcases.forEach((testcase) => console.log(calculatePrinterQueue(testcase) + 1));
});
