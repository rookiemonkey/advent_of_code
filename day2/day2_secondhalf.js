/**

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

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