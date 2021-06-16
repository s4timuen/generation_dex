// get edition specific evolution chain and triggers
import evolutionDifferences from '@/dataAssets/json/evolutionDifferences.json';
import evolutionDifferencesSchema from '@/dataAssets/schemes/evolutionDifferencesSchema.json';
import { forPairsOfTwo, genToIntTranslator, validateJson } from '@/helpers/utilities.js';
import { getDefaultFormName } from '@/helpers/defaultFormNames.js';

function getEvolutionChain(context) {
    // json data validation
    if (!validateJson(evolutionDifferences, evolutionDifferencesSchema)) { throw "Error: evolutionDifferences.json invalid." }

    return context.$store.getters.pokeApiWrapper
        .resource(context.$store.getters.selectedPokemonData.species.url)
        .then(async function (response) {
            // get first element of evolution chain
            return await context.$store.getters.pokeApiWrapper
                .resource(response.evolution_chain.url)
                .then(function (response) {
                    let evolutionChain = {
                        baby: [],
                        base: [],
                        first: [],
                        second: [],
                    };

                    let isBaby = response.chain.is_baby;

                    // build base chain from baby stage
                    if (isBaby) {
                        evolutionChain.baby.push(getData(response, context, true)); // baby

                        Array.prototype.forEach.call(response.chain.evolves_to, baseStageElement => {
                            evolutionChain.base.push(getData(baseStageElement, context, false)); // base

                            Array.prototype.forEach.call(baseStageElement.evolves_to, firstStageElement => {
                                evolutionChain.first.push(getData(firstStageElement, context, false)); // first

                                Array.prototype.forEach.call(firstStageElement.evolves_to, secondStageElement => {
                                    evolutionChain.second.push(getData(secondStageElement, context, false)); // second
                                });
                            });
                        });
                    }

                    // build base chain from base stage
                    if (!isBaby) {
                        evolutionChain.base.push(getData(response, context, true)); // base

                        Array.prototype.forEach.call(response.chain.evolves_to, firstStageElement => {
                            evolutionChain.first.push(getData(firstStageElement, context, false)); // first

                            Array.prototype.forEach.call(firstStageElement.evolves_to, secondStageElement => {
                                evolutionChain.second.push(getData(secondStageElement, context, false)); // second
                            });
                        });
                    }

                    return evolutionChain; // base evolution chain
                })
                .then(function (response) {
                    // adjust base chain to generation specifics pokemon
                    return removeUnavailablePokemon(response, context);
                })
                .then(function (response) {
                    // adjust base chain to generation specific evolution triggers
                    return adjustEvolutionTriggers(response, context);
                })
                // pool respective triggers, metods and requirements together
                .then(response => {
                    return poolRespectiveTriggers(response);
                })
                .catch(error => {
                    throw error;
                });
        })
        .catch(error => {
            throw error;
        });
}

// pool together respective triggers, metods and requirements
function poolRespectiveTriggers(chain) {
    Object.values(chain).forEach(stage => {
        if (stage.length) {
            stage.forEach(async pokemon => {
                let pooledTriggers = [];
                if (pokemon.evolution_triggers.length != 0) {
                    await forPairsOfTwo(pokemon.evolution_triggers, 1, 2, function (firstHalf, secondHalf) {
                        let triggerPool = {
                            trigger: '',
                            method: '',
                            requirement: '',
                        };
                        triggerPool.method = firstHalf[0];
                        triggerPool.requirement = firstHalf[1];
                        triggerPool.trigger = secondHalf[1].name;
                        pooledTriggers.push(triggerPool);
                    });
                    pokemon.evolution_triggers = pooledTriggers;
                }
            });
        }
    });
    return chain;
}

// alter base evolution chain to generation specific pokemon availability
async function removeUnavailablePokemon(chain, context) {
    let newChain = {
        baby: [],
        base: [],
        first: [],
        second: [],
    };
    for (let stage of Object.entries(chain)) {
        for (let pokemon of stage[1]) {
            let defaulFormName = getDefaultFormName(pokemon.name)
            await context.$store.getters.pokeApiWrapper
                .getPokemonByName(defaulFormName)
                .then(async function (response) {
                    await context.$store.getters.pokeApiWrapper
                        .resource(response.species.url)
                        .then(function (response) {
                            if (genToIntTranslator(response.generation.name) <= genToIntTranslator(context.$store.getters.dataFilter)) {
                                newChain[stage[0]].push(pokemon);
                            }
                        })
                        .catch(error => {
                            throw error;
                        });
                })
                .catch(error => {
                    throw error;
                });
        }
    }
    return newChain;
}

// alter base evolution chaint to generation specific evolution triggers
// evolution_detail contains all triggers unrespective of generation
function adjustEvolutionTriggers(chain, context) {
    let generation = context.$store.getters.dataFilter;

    Object.values(chain).forEach(stage => {
        if (stage.length) {
            stage.forEach(pokemon => {
                Object.entries(evolutionDifferences).forEach(pokemonEntry => {
                    if (pokemonEntry[0] == pokemon.name) {
                        Object.entries(pokemonEntry[1]).forEach(generationTrigger => {
                            if (generation == generationTrigger[0]) {
                                let filteredEvolutionTriggers = [];
                                // always [method], [trigger], [method], [trigger], ...
                                // each method and trigger pair represents a generation
                                forPairsOfTwo(pokemon.evolution_triggers, 1, 2, function (method, trigger) {
                                    if (
                                        generationTrigger[1][0] == trigger[1].name && // trigger
                                        Object.keys(generationTrigger[1][1])[0] == method[0] && // method
                                        Object.values(generationTrigger[1][1])[0] == method[1].name // requirement
                                    ) {
                                        filteredEvolutionTriggers.push(method, trigger);
                                    }
                                });
                                pokemon.evolution_triggers = filteredEvolutionTriggers;
                            }
                        });
                    }
                });
            });
        }
    });

    // remove evolution trigger if pre evolution is not available in selected generation
    if (chain.baby.length == 0) {
        chain.base.forEach(pokemon => {
            pokemon.evolution_triggers = [];
        });
    }
    return chain;
}

// get base data
function getData(data, context, isChainRootElement) {
    let pushObject = {
        name: '',
        evolution_triggers: [],
        sprite_url: '',
    };

    pushObject.name = setName(data, isChainRootElement);
    pushObject.evolution_triggers = setEvolutionTrigger(data, isChainRootElement);
    setSpriteUrl(data, context, isChainRootElement).then(function (response) {
        pushObject.sprite_url = response;
    });

    return pushObject;
}

// set base name
function setName(data, isChainRootElement) {
    if (isChainRootElement) {
        return data.chain.species.name;
    }
    if (!isChainRootElement) {
        return data.species.name;
    }
}

// set base evolution triggers
function setEvolutionTrigger(data, isChainRootElement) {
    let trigger = [];

    if (!isChainRootElement) {
        Array.prototype.forEach.call(data.evolution_details, evolutionDetails => {
            Array.prototype.forEach.call(Object.entries(evolutionDetails), detail => {
                if (detail[1] != null && detail[1] != '') {
                    trigger.push(detail);
                }
            });
        });
    }
    return trigger;
}

// set base sprite url
function setSpriteUrl(data, context, isChainRootElement) {
    let url = '';
    if (isChainRootElement) {
        let defaulFormName = getDefaultFormName(data.chain.species.name)
        url = context.$store.getters.pokeApiWrapper
            .getPokemonByName(defaulFormName) 
            .then(function (response) {
                return response.sprites.front_default;
            })
            .catch(error => {
                throw error;
            });
    }
    if (!isChainRootElement) {
        let defaulFormName = getDefaultFormName(data.species.name)
        url = context.$store.getters.pokeApiWrapper
            .getPokemonByName(defaulFormName)
            .then(function (response) {
                return response.sprites.front_default;
            })
            .catch(error => {
                throw error;
            });
    }
    return url;
}

export { getEvolutionChain };
