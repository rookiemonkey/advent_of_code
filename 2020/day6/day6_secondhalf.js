const input = require('./input');

const parsed = input.split('\n').map(x => x.split(' '));
const grouped = new Array();
const groups = new Array();
const groupInfos = new Array();

for (let line = 0; line <= parsed.length - 1; line++) {

    if (!parsed[line][0]) { // ignore ''
        const groupObj = groups.reduce((acc, next) => {
            return [...acc, next];
        }, [])
        grouped.push(groupObj);
        groups.splice(0, groups.length)
        continue;
    };

    groups.push(...parsed[line])
}

grouped.forEach(group => {
    const splitted = new Array();
    const finalMultiples = new Array();

    group.forEach(letter => {
        if (letter.length === 1) {
            splitted.push(letter)
        } else {
            for (let i = 0; i < letter.length; i++) {
                splitted.push(letter[i])
            }
        }
    })

    // loop to an array of letters w/o duplicates
    // compare it each line
    const noDuplicates = [...new Set(splitted)]

    noDuplicates.forEach(letter => {
        const multiples = new Array();

        for (let i = 0; i < group.length; i++) {
            const indexOfLetter = group[i].indexOf(letter);
            indexOfLetter >= 0
                ? multiples.push(letter)
                : null
        }

        multiples.length === group.length
            ? finalMultiples.push(letter)
            : null
    })

    groupInfos.push({
        group,
        numOfPeople: group.length,
        numOfMultiples: finalMultiples.length
    })
})

const numOfMultiples = groupInfos.reduce((acc, next) => acc + next.numOfMultiples, 0)

console.log(numOfMultiples)