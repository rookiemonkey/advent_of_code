const input = require('./input');

const program = input.split('\n');
const cmds = new Object();
let programIsRunning = true;
let index = 0;
let accumulator = 0;

function run(cmd, args, lineNumber) {

    // increment the number of times a certain lineNumber was invoked
    !cmds[lineNumber]
        ? cmds[lineNumber] = { count: 1 }
        : cmds[lineNumber].count += 1

    // check if lineNumber is about to be executed the second time then halt the function
    if (cmds[lineNumber].count >= 2) {
        programIsRunning = false
        return null;
    };

    // parse the args parameter
    const argsArray = args.split('')
    const [operator] = argsArray.splice(0, 1)
    const amount = parseInt(argsArray.join(''))

    switch (true) {

        case cmd === 'nop':
            // halt the fuction right away then next line of program array
            index += 1
            break;

        case cmd === 'acc':
            // increment (by args) the accumulator then next line of program array
            operator === '+'
                ? accumulator += amount
                : accumulator -= amount
            index += 1
            break;

        case cmd === 'jmp':
            // change the index
            operator === '+'
                ? index += amount
                : index -= amount
            break;
    }
}

while (programIsRunning) {
    const line = program[index]
    const [cmd, args] = line.split(' ')
    run(cmd, args, index)
}

console.log(accumulator)