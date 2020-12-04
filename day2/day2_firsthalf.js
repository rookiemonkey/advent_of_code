const input = require('./input')

// used REGEX to split the string
// directive- r match all escape codes and ignore
// directive- ? follows by
const inputNoBreaks = input.split(/\r?\n/);

// define valid passwords
const validPasswords = new Array();

// loop into the input to access each string inputs
inputNoBreaks.forEach(input => {
    const [threshold, toMatch, password] = input.split(' ');
    const [min, max] = threshold.split('-');
    const [letter] = toMatch.split('')

    const matchedLettersLength = password
        .split('')
        .filter(l => l == letter)
        .join('')
        .length

    if (matchedLettersLength >= parseInt(min) &&
        matchedLettersLength <= parseInt(max))
        validPasswords.push(input)
})

// extract num of valid passwords by the lenght of the array
const numOfValidPasswords = validPasswords.length;

console.log(numOfValidPasswords)
