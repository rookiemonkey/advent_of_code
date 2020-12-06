const input = require('./input');

const parsed = input.split('\n').map(x => x.split(' '));
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] // cid is optional
let grouped = new Array();
let valid = new Array();
let passport = new Array();

for (let line = 0; line <= parsed.length - 1; line++) {

    if (!parsed[line][0]) { // ignore ''
        const passportObj = passport.reduce((acc, next) => {
            acc[next.key] = next.value;
            return acc;
        }, {})
        grouped.push(passportObj);
        passport.splice(0, passport.length)
        continue;
    };

    for (let content = 0; content <= parsed[line].length - 1; content++) {
        const [key, value] = parsed[line][content].split(':')
        passport.push({ key, value })
    }
}

grouped.forEach(passport => {
    const keys = Object.keys(passport);

    required.every(requiredKey => keys.some(key => key === requiredKey))
        ? valid.push(passport)
        : null
})

console.log(valid.length)