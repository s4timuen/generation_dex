import { validateJson } from '@/helpers/utilities.js';
import defaultFormNames from '@/dataAssets/json/defaulFormNames.json';
import defaultFormNameSchema from '@/dataAssets/schemes/defaultFormNameSchema.json';

// get default sprite name
function getDefaultFormName(speciesName) {
    // json data validation
    if (!validateJson(defaultFormNames, defaultFormNameSchema)) { throw "Error: defaultFormNames.json invalid." }

    let defaulFormName = speciesName;
    defaultFormNames.forEach((element) => {
        if (speciesName == element.pokemon_name) {
            defaulFormName = element.default_sprite_name;
        }
    });
    return defaulFormName;

}

export { getDefaultFormName }
