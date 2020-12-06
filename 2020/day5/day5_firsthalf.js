const input = require('./input');

const parsed = input.split('\n')
const numOfRows = new Array()
const numOfCols = new Array()
const ids = new Array();

// fill numOfRows and numOfCols with numbers
for (let i = 0; i < 128; i++) { numOfRows.push(i) }
for (let j = 0; j < 8; j++) { numOfCols.push(j) }

parsed.forEach(seatCode => {
    const code = seatCode.split('')
    const rowCode = code.filter((c, i) => i <= 6)
    const colCode = code.filter((c, i) => i >= 7)
    const rowData = [...numOfRows]
    const colData = [...numOfCols]


    rowCode.forEach(letter => {

        switch (letter) {
            case 'F': // lower half
                rowData.splice(Math.ceil((rowData.length - 1) / 2), rowData.length - 1)
                break;
            case 'B': // upper half
                rowData.splice(0, Math.ceil((rowData.length - 1) / 2))
                break;
        }
    })

    colCode.forEach(letter => {
        switch (letter) {
            case 'L': // lower half
                colData.splice(Math.ceil((colData.length - 1) / 2), colData.length - 1)
                break;
            case 'R': // upper half
                colData.splice(0, Math.ceil((colData.length - 1) / 2))
                break;
        }
    })

    ids.push((rowData[0] * 8) + colData[0]);
})

console.log(Math.max(...ids))
