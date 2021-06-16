import Ajv from "ajv";
const ajv = new Ajv();

// get data for selected pokemon from API wrapper
function setSelectedPokemonData(name, context) {
    context.$store.getters.pokeApiWrapper
        .getPokemonByName(name)
        .then(function (response) {
            context.$store.commit('setSelectedPokemonData', response);
        })
        .catch(error => {
            throw error;
        });
}

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

// show divs
function showDivs(document, ids) {
    ids.forEach(id => {
        document.getElementById(id).setAttribute('style', 'display: block');
    });
}

// hide divs
function hideDivs(document, ids) {
    ids.forEach(id => {
        document.getElementById(id).setAttribute('style', 'display: none');
    });
}

// enable divs
function enableDivs(document, ids) {
    ids.forEach(id => {
        document.getElementById(id).removeAttribute("disabled");
    });

}

// disable divs
function disableDivs(document, ids) {
    ids.forEach(id => {
        document.getElementById(id).setAttribute("disabled", true);
    });
}

// translate generation string to integer
function genToIntTranslator(generationString) {
    let translatorObject = {
        national: 99,
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

// check if variety is available in selected genertaion
function checkVarietyGenerationAvailability(name, dataFilter) {
    // only required if variety/ies was/were introduced in later generation/s than the pokemon was introduced in
    let available = true;
    let genInt = genToIntTranslator(dataFilter);
    // primal (gen 6), mega (gen 6)
    if (
        genInt < 6 &&
        (name.includes('mega') ||
            name.includes('primal') ||
            name.includes('alola') ||
            name.includes('galar') ||
            name.includes('gmax') ||
            name.includes('eternamax'))
    ) {
        available = false;
    }
    // alola (gen 7)
    if (genInt == 6 && (name.includes('alola') || name.includes('galar') || name.includes('gmax') || name.includes('eternamax'))) {
        available = false;
    }
    // galar (gen 8), gmax (gen 8), eternamax (gen 8)
    if (genInt == 7 && (name.includes('galar') || name.includes('gmax') || name.includes('eternamax'))) {
        available = false;
    }
    return available;
}

// translate version string to generation string
function versionToGenMap(version) {
    let generation = {
        red: 'generation-i',
        blue: 'generation-i',
        yellow: 'generation-i',
        gold: 'generation-ii',
        silver: 'generation-ii',
        crystal: 'generation-ii',
        ruby: 'generation-iii',
        sapphire: 'generation-iii',
        emerald: 'generation-iii',
        firered: 'generation-iii',
        leafgreen: 'generation-iii',
        pearl: 'generation-iv',
        diamond: 'generation-iv',
        platinum: 'generation-iv',
        heartgold: 'generation-iv',
        black: 'generation-v',
        white: 'generation-v',
        'black-2': 'generation-v',
        'white-2': 'generation-v',
        x: 'generation-vi',
        y: 'generation-vi',
        'omega-ruby': 'generation-vi',
        'alpha-sapphire': 'generation-vi',
        sun: 'generation-vii',
        moon: 'generation-vii',
        'ultra-sun': 'generation-vii',
        'ultra-moon': 'generation-vii',
        sword: 'generation-viii',
        shield: 'generation-viii',
    };
    return generation[version];
}

// validate json using json-schema
function validateJson(json, schema) {
    const validate = ajv.compile(schema);
    let valid = json.every(obj => {
        return validate(obj) == true;
    });
    if (valid) {
        return true;
    } if (!valid) {
        return false;
    }
}

export { setSelectedPokemonData, capitalize, forPairsOfTwo, showDivs, hideDivs, enableDivs, disableDivs, genToIntTranslator, checkVarietyGenerationAvailability, versionToGenMap, validateJson }
