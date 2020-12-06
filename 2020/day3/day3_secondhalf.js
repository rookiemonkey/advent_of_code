const input = require('./input');
const getTreesFirst = require('./day3_firsthalf');

function getTreesSecond(input, xcoor, ycoor) {
    const numberOfTrees = new Array();

    for (let i = 0; i < xcoor.length; i++) {
        const totalTrees = getTreesFirst(input, xcoor[i], ycoor[i]);
        numberOfTrees.push(totalTrees);
    }

    return numberOfTrees.reduce((a, b) => a * b, 1);
}

const trees = getTreesSecond(input, [1, 3, 5, 7, 1], [1, 1, 1, 1, 2])
console.log('SECOND HALF', trees)