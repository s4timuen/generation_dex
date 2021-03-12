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

export { capitalize, forPairsOfTwo };
