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

export { capitalize, forPairsOfTwo, showDiv, hideDiv };
