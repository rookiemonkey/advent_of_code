const input = require('./input');

function getTreesFirst(input, xcoor, ycoor) {
    const rows = input.split('\n').map(x => x.split(''));
    const numberOfTrees = new Array();
    let x = 0;
    let y = 0;

    while (y < rows.length) {
        const adjustedX = x % rows[0].length;
        const coordinate = rows[y][adjustedX];

        if (coordinate === `#`) numberOfTrees.push(coordinate)

        x += xcoor;
        y += ycoor;
    }

    return numberOfTrees.length;
}

const trees = getTreesFirst(input, 3, 1)
console.log('FIRST HALF', trees)

module.exports = getTreesFirst;