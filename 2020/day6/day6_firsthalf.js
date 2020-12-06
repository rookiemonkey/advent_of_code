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

    group.forEach(letter => {
        if (letter.length === 1) {
            splitted.push(letter)
        } else {
            for (let i = 0; i < letter.length; i++) {
                splitted.push(letter[i])
            }
        }
    })

    groupInfos.push({
        group,
        numOfPeople: group.length,
        numOfYesOnQuestions: new Set(splitted).size
    })
})

const numOfYes = groupInfos.reduce((acc, next) => acc + next.numOfYesOnQuestions, 0)

console.log(numOfYes)