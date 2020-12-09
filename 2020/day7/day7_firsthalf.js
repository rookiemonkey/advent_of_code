const input = require('./input');

const parsed = input.split('\n');
const bags = new Object();
const validBags = new Set();

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
function traverseBags(content, mainBag) {
    const contentType = Object.keys(bags[content]);

    if (contentType.includes('shiny gold')) {
        validBags.add(mainBag);
        return;
    }

    if (contentType.length === 0) return;

    for (let i = 0; i < contentType.length; i++) {
        traverseBags(contentType[i], mainBag);
    }
}

// begin traversing bags using the keys
const mainBags = Object.keys(bags)

for (let i = 0; i < mainBags.length; i++) {
    traverseBags(mainBags[i], mainBags[i]);
}

console.log(validBags.size)