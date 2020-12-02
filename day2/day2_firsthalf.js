/**

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

 */
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
