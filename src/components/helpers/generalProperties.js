// get generation specific general properties
function getGeneralProperties(pokemonData) {
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

    // todo: generation specifics

    return generalProperties;
}

export { getGeneralProperties };
