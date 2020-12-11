const input = require('./input');

const sampleInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

const program = input.split('\n');
const accumulators = new Array();
const nopsAndJmpsIndexes = new Array();
let cmds = new Object();
let programRunning = true;
let programAccumulator = 0;
let programIndex = 0;
let programIndexReplace = 0;

// loop into each line of the program to check nop and jmp and extract their indexes
program.forEach((line, index) => {
    const [cmd, args] = line.split(' ')

    if (args !== '+0' && cmd === 'nop' || cmd === 'jmp')
        nopsAndJmpsIndexes.push(index)

})

function boot(cmd, args, lineNumber) {

    // increment the number of times a certain lineNumber was invoked
    !cmds[lineNumber]
        ? cmds[lineNumber] = { count: 1 }
        : cmds[lineNumber].count += 1

    // check if lineNumber is about to be executed the second time then halt the function
    if (cmds[lineNumber].count >= 2) {
        programRunning = false
        return true;
    };

    // parse the args parameter
    const argsArray = args.split('')
    const [operator] = argsArray.splice(0, 1)
    const amount = parseInt(argsArray.join(''))

    switch (true) {

        case cmd === 'nop':
            // halt the fuction right away then next line of program array
            programIndex += 1
            break;

        case cmd === 'acc':
            // increment (by args) the accumulator then next line of program array
            operator === '+'
                ? programAccumulator += amount
                : programAccumulator -= amount
            programIndex += 1
            break;

        case cmd === 'jmp':
            // change the index
            operator === '+'
                ? programIndex += amount
                : programIndex -= amount
            break;
    }
}

while (programIndexReplace < nopsAndJmpsIndexes.length) {
    let nope;

    // replace nop with jmp or jmp with nop
    const programCopy = [...program];
    const lineIndexToBeReplaced = nopsAndJmpsIndexes[programIndexReplace];
    const lineCommandToBeReplaced = programCopy[lineIndexToBeReplaced];
    const [cmdToBeReplaced, argsDontReplace] = lineCommandToBeReplaced.split(' ');
    const cmdReplacement = cmdToBeReplaced === 'nop' ? 'jmp' : 'nop'
    programCopy.splice(lineIndexToBeReplaced, 1, `${cmdReplacement} ${argsDontReplace}`)

    // loop on programCopy that contains replaced nop/jmp
    while (programRunning && programIndex < programCopy.length) {
        const [cmd, args] = programCopy[programIndex].split(' ')
        const isNope = boot(cmd, args, programIndex)
        if (isNope) nope = isNope;
    }

    // store needed informations
    accumulators.push({
        lineIndexToBeReplaced,
        cmdToBeReplaced,
        argsDontReplace,
        programAccumulator,
        nope
    })

    // reset all global variables for the next loop
    programIndexReplace++
    programIndex = 0;
    programAccumulator = 0;
    programRunning = true;
    cmds = new Object();
}

const notNope = accumulators.find(result => result.nope === undefined)

console.log({
    program,
    nopsAndJmpsIndexes,
    accumulators,
    notNope
})