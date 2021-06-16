import typeDiffreneces from '@/dataAssets/json/typeDifferences.json';
import typeDifferencesSchema from '@/dataAssets/schemes/typeDifferencesSchema.json';
import { validateJson } from '@/helpers/utilities.js'

// get generation specific types
function getTypes(pokemonData, context) {
    // json data validation
    if (!validateJson(typeDiffreneces, typeDifferencesSchema)) { throw "Error: typeDiffreneces.json invalid." }

    let types = [];
    let dataFilter = context.$store.getters.dataFilter;

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
