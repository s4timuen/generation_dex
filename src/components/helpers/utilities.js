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

// translate version string to generation string
function versionToGenMap(version) {
    // fix: e.g. leafgreen not in obj -> null ref -> switch?

    let generation = '';

    switch (version) {
        case 'red':
            generation = 'generation-i';
            break;
        case 'blue':
            generation = 'generation-i';
            break;
        case 'yellow':
            generation = 'generation-i';
            break;
        case 'gold':
            generation = 'generation-ii';
            break;
        case 'silver':
            generation = 'generation-ii';
            break;
        case 'crystal':
            generation = 'generation-ii';
            break;
        case 'ruby':
            generation = 'generation-iii';
            break;
        case 'sapphire':
            generation = 'generation-iii';
            break;
        case 'emerald':
            generation = 'generation-iii';
            break;
        case 'pearl':
            generation = 'generation-iv';
            break;
        case 'diamond':
            generation = 'generation-iv';
            break;
        case 'platinum':
            generation = 'generation-iv';
            break;
        case 'black':
            generation = 'generation-v';
            break;
        case 'white':
            generation = 'generation-v';
            break;
        case 'black-2':
            generation = 'generation-v';
            break;
        case 'white-2':
            generation = 'generation-v';
            break;
        case 'x':
            generation = 'generation-vi';
            break;
        case 'y':
            generation = 'generation-vi';
            break;
        case 'sun':
            generation = 'generation-vii';
            break;
        case 'moon':
            generation = 'generation-vii';
            break;
        case 'ultra-sun':
            generation = 'generation-vii';
            break;
        case 'ultra-moon':
            generation = 'generation-vii';
            break;
        case 'sword':
            generation = 'generation-viii';
            break;
        case 'shield':
            generation = 'generation-viii';
            break;
        default:
            generation = '';
            break;
    }
    return generation;
}

export { capitalize, forPairsOfTwo, showDiv, hideDiv, genToIntTranslator, versionToGenMap };
