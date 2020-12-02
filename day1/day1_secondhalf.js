/**
 * Using the above example again, the three entries that sum to 2020 
 * are 979, 366, and 675. Multiplying them together produces the answer, 241861950.
 * 
 * In your expense report, what is the product of the three entries that sum to 2020?
 */


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

        for (let j = 0; j <= inputToArray.length - 1; j++) {
            if (j === i) continue;

            const sum = num + inputToArray[i] + inputToArray[j];

            sum === 2020 ? results.push(num, inputToArray[i], inputToArray[j]) : null;
        }

    }

})

// extract the 3 numbers
const [num1, num2, num3] = new Set([...results]);

// get their product
const product = num1 * num2 * num3;

console.log(product)