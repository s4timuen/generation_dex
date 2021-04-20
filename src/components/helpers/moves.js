import { genToIntTranslator } from '@/components/helpers/utilities.js';

// get generation specific moves
function getMoves(pokemonData, context) {
    let moves = [];

    // get full moves list
    pokemonData.moves.forEach(element => {
        context.$store.getters.pokeApiWrapper
            .getMoveByName(element.move.name)
            // delete move if not available in selected generation
            .then(function(response) {
                let dataFilter = context.$store.getters.dataFilter;
                let moveGen = response.generation.name;

                switch (dataFilter) {
                    case '':
                        break;
                    case 'generation-i':
                        if (genToIntTranslator(moveGen) < 2) {
                            response = null;
                        }
                        break;
                    case 'generation-ii':
                        if (genToIntTranslator(moveGen) < 3) {
                            response = null;
                        }
                        break;
                    case 'generation-iii':
                        if (genToIntTranslator(moveGen) < 4) {
                            response = null;
                        }
                        break;
                    case 'generation-iv':
                        if (genToIntTranslator(moveGen) < 5) {
                            response = null;
                        }
                        break;
                    case 'generation-v':
                        if (genToIntTranslator(moveGen) < 6) {
                            response = null;
                        }
                        break;
                    case 'generation-vi':
                        if (genToIntTranslator(moveGen) < 7) {
                            response = null;
                        }
                        break;
                    case 'generation-vii':
                        if (genToIntTranslator(moveGen) < 8) {
                            response = null;
                        }
                        break;
                    case 'generation-viii':
                        break;
                    default:
                        break;
                }
                return response;
            })
            // cut unecessary info from move
            .then(function(response) {
                if (response != null) {
                    delete response.contest_combos;
                    delete response.contest_effect;
                    delete response.contest_type;
                    delete response.flavor_text_entries;
                    delete response.id;
                    delete response.learned_by_pokemon;
                    delete response.machines;
                    delete response.meta; // could be intressting
                    delete response.names; // for localization
                    delete response.super_contest_effect;
                }
                return response;
            })
            // change move generation specifics
            .then(function(response) {
                if (response != null) {
                    // todo: generation specific move data
                }
                return response;
            })
            // add to moves list
            .then(function(response) {
                if (response != null) {
                    moves.push(response);
                }
            })
            .catch(error => {
                throw error;
            });
    });
    return moves;
}

export { getMoves };
