import { genToIntTranslator } from '@/helpers/utilities.js';
import moveDamageClassDifferences from '@/dataAssets/moveDamageClassDifferences.json';
import { versionToGenMap } from '@/helpers/utilities';

// get generation specific moves
function getMoves(pokemonData, context) {
    let dataFilter = context.$store.getters.dataFilter;
    let moves = [];

    pokemonData.moves.forEach(element => {
        context.$store.getters.pokeApiWrapper
            .getMoveByName(element.move.name)
            // delete move if not available in selected generation
            .then(function(response) {
                let moveGen = response.generation.name;

                switch (dataFilter) {
                    case 'generation-i':
                        if (genToIntTranslator(moveGen) > 1) {
                            response = null;
                        }
                        break;
                    case 'generation-ii':
                        if (genToIntTranslator(moveGen) > 2) {
                            response = null;
                        }
                        break;
                    case 'generation-iii':
                        if (genToIntTranslator(moveGen) > 3) {
                            response = null;
                        }
                        break;
                    case 'generation-iv':
                        if (genToIntTranslator(moveGen) > 4) {
                            response = null;
                        }
                        break;
                    case 'generation-v':
                        if (genToIntTranslator(moveGen) > 5) {
                            response = null;
                        }
                        break;
                    case 'generation-vi':
                        if (genToIntTranslator(moveGen) > 6) {
                            response = null;
                        }
                        break;
                    case 'generation-vii':
                        if (genToIntTranslator(moveGen) > 7) {
                            response = null;
                        }
                        break;
                    case 'generation-viii':
                        if (genToIntTranslator(moveGen) > 8) {
                            response = null;
                        }
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
            // change generation specific stats and type from response.past_values
            .then(function(response) {
                if (response != null) {
                    if (response.past_values.length != 0) {
                        response.past_values.forEach(change => {
                            if (versionToGenMap(change.version_group.name) == dataFilter) {
                                if (change.accuracy != null) {
                                    response.accuracy = change.accuracy;
                                }
                                if (change.effect_chance != null) {
                                    response.effect_chance = change.effect_chance;
                                }
                                if (change.effect_entries.length != 0) {
                                    response.effect_entries = change.effect_entries;
                                }
                                if (change.power != null) {
                                    response.power = change.power;
                                }
                                if (change.pp != null) {
                                    response.pp = change.pp;
                                }
                                if (change.type != null) {
                                    response.type = change.type;
                                }
                            }
                        });
                    }
                }
                return response;
            })
            // change generation specific damage class from type or moveDamageClassDifferences.json
            .then(function(response) {
                if (response != null) {
                    // generation i, ii and iii -> damage class change by type
                    if (dataFilter == 'generation-i' || dataFilter == 'generation-ii' || dataFilter == 'generation-iii') {
                        if (response.damage_class.name != 'status') {
                            switch (response.type.name) {
                                case ('normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel'):
                                    response.damage_class.name = 'physical';
                                    response.damage_class.url = 'https://pokeapi.co/api/v2/move-damage-class/2/';
                                    break;
                                case ('fire', 'psychic', 'electric', 'grass', 'water', 'dragon', 'ice', 'dark'):
                                    response.damage_class.name = 'special';
                                    response.damage_class.url = 'https://pokeapi.co/api/v2/move-damage-class/3/';
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    // since generation iv individual damage class -> damage class change from moveDamageClassDifferences.json
                    if (dataFilter != 'generation-i' && dataFilter != 'generation-ii' && dataFilter != 'generation-iii') {
                        Object.entries(moveDamageClassDifferences).forEach(move => {
                            if (response.name == move[0]) {
                                move[1].differences.forEach(difference => {
                                    if (difference.generation[0] == dataFilter) {
                                        response.damage_class.name = difference.name;
                                        response.damage_class.url = difference.url;
                                    }
                                });
                            }
                        });
                    }
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
