const input = require('./input')

// used REGEX to split the string
// directive- r match all escape codes and ignore
// directive- ? follows by
const inputNoBreaks = input.split(/\r?\n/);

// define valid passwords
const validPasswords = new Array();

// loop into the input to access each string inputs
inputNoBreaks.forEach(input => {
    const [position, toMatch, password] = input.split(' ');
    const [pos1, pos2] = position.split('-');
    const [letter] = toMatch.split('')

    const charOnPos1 = password.charAt(parseInt(pos1) - 1)
    const charOnPos2 = password.charAt(parseInt(pos2) - 1)


    if (charOnPos1 == letter && charOnPos2 != letter ||
        charOnPos1 != letter && charOnPos2 == letter)
        validPasswords.push(input);

})

// extract num of valid passwords by the lenght of the array
const numOfValidPasswords = validPasswords.length;

console.log(numOfValidPasswords)