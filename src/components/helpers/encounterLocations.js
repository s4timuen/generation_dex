// get generations specific encounter locations
import { versionToGenMap } from '@/components/helpers/utilities.js';

function getEncounterLocations(pokemonData, context) {
    let dataFilter = context.$store.getters.dataFilter;

    return (
        context.$store.getters.pokeApiWrapper
            // default (all) encounter locations
            .resource(pokemonData.location_area_encounters)
            // generations specific encounter locations
            .then(function(response) {
                let locations = [];

                // national dex -> all locations
                if (dataFilter == '') {
                    locations = response;
                }
                // specific generation
                if (dataFilter != '') {
                    response.forEach(location => {
                        location.version_details.forEach(detail => {
                            if (versionToGenMap(detail.version.name) == dataFilter) {
                                locations.push(location);
                            }
                        });
                    });
                }
                return locations;
            })
            .catch(error => {
                throw error;
            })
    );
}

export { getEncounterLocations };
