// first letter capital
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// "forEach" for pairs of two
function forPairsOfTwo(array, distancePairElements, distanceStartElements, func) {
    for (let index = 0; index < array.length - distancePairElements; index += distanceStartElements) {
        func(array[index], array[index + distancePairElements]);
    }
}

// show div
function showDiv(id) {
    document.getElementById(id).setAttribute('style', 'display: block');
}

// hide div
function hideDiv(id) {
    document.getElementById(id).setAttribute('style', 'display: none');
}

// translate generation string to integer
function genToIntTranslator(generationString) {
    let translatorObject = {
        '': 0,
        'generation-i': 1,
        'generation-ii': 2,
        'generation-iii': 3,
        'generation-iv': 4,
        'generation-v': 5,
        'generation-vi': 6,
        'generation-vii': 7,
        'generation-viii': 8,
    };
    return translatorObject[generationString];
}

export { capitalize, forPairsOfTwo, showDiv, hideDiv, genToIntTranslator };
