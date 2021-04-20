import typeDiffreneces from '@/components/dataAssets/typeDifferences.json';

// get generation specific types
function getTypes(pokemonData, context) {
    let types = [];
    let dataFilter = context.$store.getters.dataFilter;

    // todo: form/mega/gmax

    // get default types
    types = pokemonData.types;

    // generation specifics
    Object.entries(typeDiffreneces).forEach(pokemon => {
        if (pokemon[0] == pokemonData.name) {
            pokemon[1].differences.forEach(difference => {
                difference.generations.forEach(generation => {
                    if (generation == dataFilter) {
                        types = difference.types;
                    }
                });
            });
        }
    });

    return types;
}

export { getTypes };
