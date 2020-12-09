const input = require('./input');

const sampleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const parsed = input.split('\n');
const bags = new Object();
let numOfShinyGolds = 0;

// parse each rule to key/value pairs for easy searching
parsed.forEach(mainBag => {
    const phrases = mainBag.split(' ');
    const contents = new Array();
    const contentsGrouped = new Array();
    const contentsFinal = new Object();
    const main = new Object();

    // remove unnecesarry phrases from the rule
    phrases.forEach((phrase, index) => {
        switch (true) {
            case index == 1:
                main[`${phrases[index - 1]} ${phrase}`] = null;
                break;
            case index >= 4:
                phrase === 'no' || phrase === 'other' ||
                    phrase === 'bags' || phrase === 'bags.' ||
                    phrase === 'bags,' || phrase === 'bag.' ||
                    phrase === 'bag,'
                    ? null
                    : contents.push(phrase)
                break;
        }
    })

    // group phrases into 1 every 3rd phrase
    contents.reduce((acc, next, index) => {

        if ((index + 1) % 3 === 0) {
            contentsGrouped.push([...acc, next]);
            acc = []
            return acc;
        }

        return [...acc, next]

    }, [])

    // object for contents of a main baag
    contentsGrouped.forEach(content => {
        const [num, str1, str2] = content
        contentsFinal[`${str1} ${str2}`] = parseInt(num)
    }, [])

    // assign the main bag key as the key, contents as the value
    const [mainBagKey] = Object.keys(main);
    bags[mainBagKey] = contentsFinal
})

// recursive function to traverse into the mainBag and its contents
function traverseBags(content, count) {
    const contentType = Object.keys(bags[content]);

    if (contentType.length === 0) return;

    for (let i = 0; i < contentType.length; i++) {
        const currentBagTotal = bags[content][contentType[i]];
        const childrenToAdd = count * currentBagTotal;

        numOfShinyGolds += childrenToAdd;
        traverseBags(contentType[i], childrenToAdd);
    }
}

// begin traversing
traverseBags('shiny gold', 1);

console.log(numOfShinyGolds)