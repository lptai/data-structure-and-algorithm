const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    // input: process.stdin,
    input: fs.createReadStream('bigo-coding/day1/0.input.json'),
    output: process.stdout,
    terminal: false,
});

let lines = [];

/**
 * Time complexity O(n)
 * Space complexity O(n)
 */
rl.on('line', function (line) {
    lines.push(line);
}).on('close', () => {
    const pwd = lines[lines.length - 1];
    const k = lines[0].split(' ')[1];
    const wrongPwds = []; // wrong password w length less than right password
    const potentialRightPwds = []; // password with length equal with right password
    const pwdList = lines.slice(1, lines.length - 1);

    for (let i = 0; i < pwdList.length; i++) {
        if (pwdList[i].length < pwd.length) {
            wrongPwds.push(pwdList[i]);
        } else if (pwdList[i].length === pwd.length) {
            potentialRightPwds.push(pwdList[i]);
        }
    }

    const bestTime = Math.floor(wrongPwds.length / k) * 5 + wrongPwds.length + 1;
    const wrongPwdCount = wrongPwds.length + potentialRightPwds.length - 1;
    const worstTime = Math.floor(wrongPwdCount / k) * 5 + wrongPwdCount + 1;

    console.log(bestTime, worstTime);
});
