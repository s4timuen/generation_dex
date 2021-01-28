// filter generation divs to display
function showHideGenerationDivs(dataFilter) {
    switch (dataFilter) {
        case 'national':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            showDiv('kalos')
            showDiv('alola')
            showDiv('galar')
            break
        case 'kanto':
            showDiv('kanto')
            hideDiv('johto')
            hideDiv('hoen')
            hideDiv('sinnoh')
            hideDiv('unova')
            hideDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'johto':
            showDiv('kanto')
            showDiv('johto')
            hideDiv('hoen')
            hideDiv('sinnoh')
            hideDiv('unova')
            hideDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'hoen':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            hideDiv('sinnoh')
            hideDiv('unova')
            hideDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'sinnoh':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            hideDiv('unova')
            hideDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'unova':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            hideDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'kalos':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            showDiv('kalos')
            hideDiv('alola')
            hideDiv('galar')
            break
        case 'alola':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            showDiv('kalos')
            showDiv('alola')
            hideDiv('galar')
            break
        case 'galar':
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            showDiv('kalos')
            showDiv('alola')
            showDiv('galar')
            break
        default:
            showDiv('kanto')
            showDiv('johto')
            showDiv('hoen')
            showDiv('sinnoh')
            showDiv('unova')
            showDiv('kalos')
            showDiv('alola')
            showDiv('galar')
    }
}
function showDiv(id) {
    document.getElementById(id).setAttribute('style', 'display: block')
}
function hideDiv(id) {
    document.getElementById(id).setAttribute('style', 'display: none')
}

export { showHideGenerationDivs }
