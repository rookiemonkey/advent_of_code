const input = require('./input');

const parsed = input.split('\n').map(x => x.split(' '));
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] // cid is optional
let grouped = new Array();
let validInit = new Array();
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
        ? validInit.push(passport)
        : null
})

const validFinal = validInit.filter(passport => {
    const { byr, iyr, eyr, hcl, ecl, pid, hgt } = passport

    const hclRegEx = new RegExp(/#[0-9a-f]{6}/, 'g')
    const eclRegEx = new RegExp(/(amb|blu|brn|gry|grn|hzl|oth)/, 'g')
    const pidRegEx = new RegExp(/(\d*)/, 'g')
    const hgtRegEx = new RegExp(/(\d+)(cm|in)/, 'g')

    const isByrValid = byr.length === 4 && byr >= 1920 && byr <= 2002;
    const isIyrValid = iyr.length === 4 && iyr >= 2010 && iyr <= 2020;
    const isEyrValid = eyr.length === 4 && eyr >= 2020 && eyr <= 2030;
    const isHclValid = hclRegEx.test(hcl)
    const isEclValid = eclRegEx.test(ecl)
    const isPidValid = pidRegEx.test(pid) && pid.length === 9

    const unitInit = new Array()
    const heightInit = new Array()

    hgt
        .split('')
        .forEach(char => {
            parseInt(char) || parseInt(char) === 0
                ? heightInit.push(char)
                : unitInit.push(char)
        })

    const unit = unitInit.join('')
    const height = heightInit.join('')
    const numHeight = parseInt(height)
    const isFormatValid = hgtRegEx.test(hgt)
    let isHgtValid;

    switch (unit) {
        case 'cm':
            isHgtValid = isFormatValid && numHeight >= 150 && numHeight <= 193
            break;
        case 'in':
            isHgtValid = isFormatValid && numHeight >= 59 && numHeight <= 76
            break;
    }

    return isByrValid && isIyrValid && isEyrValid &&
        isHclValid && isEclValid && isPidValid && isHgtValid
})


console.log(validFinal.length)
