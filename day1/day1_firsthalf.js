const input = require('./input');
const results = new Array();

// remove all line breaks \n
const inputNoBreaks = input.replace(/\n/g, ' ');

// convert to array separated by spaces parsed into an integer
const inputToArray = inputNoBreaks
    .split(' ')
    .filter(num => Boolean(num))
    .map(num => parseInt(num))

// loop into each number and add it to each item in the same array except it self
inputToArray.forEach((num, index) => {

    // used for loop instead of foreach to access continue directive
    for (let i = 0; i <= inputToArray.length - 1; i++) {
        if (index === i) continue;

        const sum = num + inputToArray[i];

        sum === 2020 ? results.push(num, inputToArray[i]) : null;
    }

})

// extract the 2 numbers
const [num1, num2] = new Set([...results]);

// get their product
const product = num1 * num2;

console.log(product)