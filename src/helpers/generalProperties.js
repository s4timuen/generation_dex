import { versionToGenMap } from '@/helpers/utilities.js';

// get generation specific general properties
function getGeneralProperties(pokemonData, context) {
    let dataFilter = context.$store.getters.dataFilter;
    let generalProperties = {
        base_experience: 0,
        height: 0,
        weight: 0,
        held_items: [],
    };

    // get base data from selected pokemon data
    generalProperties.base_experience = pokemonData.base_experience;
    generalProperties.height = pokemonData.height;
    generalProperties.weight = pokemonData.weight;
    generalProperties.held_items = pokemonData.held_items;
    // if more, get additional info using context.$store.getters.pokeApiWrapper

    // generation specifics (held_item only)
    for (let i = generalProperties.held_items.length - 1; i >= 0; i--) {
        for (let j = generalProperties.held_items[i].version_details.length - 1; j >= 0; j--) {
            if (dataFilter != 'national') {
                if (versionToGenMap(generalProperties.held_items[i].version_details[j].version.name) != dataFilter) {
                    generalProperties.held_items[i].version_details.splice(j, 1);
                }
            }
        }
        if (generalProperties.held_items[i].version_details.length == 0) {
            generalProperties.held_items.splice(i, 1);
        }
    }
    return generalProperties;
}

export { getGeneralProperties };
