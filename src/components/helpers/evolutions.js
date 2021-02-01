// get full evolution chain
// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_with_branched_evolutions
function getEvolutionChain(context) {
    return context.$store.getters.pokeApiWrapper
        .resource(context.$store.getters.selectedPokemonData.species.url)
        .then(async function(response) {
            // get first of evolution chain
            return await context.$store.getters.pokeApiWrapper
                .resource(response.evolution_chain.url)
                .then(function(response) {
                    // response is evolution chain

                    console.log(response);

                    let evolutionChain = {
                        baby: [],
                        base: [],
                        first: [],
                        second: [],
                    };

                    let isBaby = response.chain.is_baby;

                    // start from baby stage
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

                    // start from base stage
                    if (!isBaby) {
                        evolutionChain.base.push(getData(response, context, true)); // base

                        Array.prototype.forEach.call(response.chain.evolves_to, firstStageElement => {
                            evolutionChain.first.push(getData(firstStageElement, context, false)); // first

                            Array.prototype.forEach.call(firstStageElement.evolves_to, secondStageElement => {
                                evolutionChain.second.push(getData(secondStageElement, context, false)); // second
                            });
                        });
                    }
                    return evolutionChain;
                })
                .catch(error => {
                    throw error;
                });
        })
        .catch(error => {
            throw error;
        });
}

function getData(data, context, isChainRootElement) {
    // todo: check generations specific triggers (e.g. Magnezone)
    // todo: check forms (e.g. Persian and Perrserker -> same evolution triggers)
    // todo: check availablility in generation (context.$store.getters.dataFilter)
    // todo: reformat triggers

    // todo: mega evolutions ?

    let pushObject = {
        name: '',
        evolution_triggers: [],
        sprite_url: '',
    };

    pushObject.name = setName(data, isChainRootElement);
    pushObject.evolution_triggers = setEvolutionTrigger(data, isChainRootElement);
    setSpriteUrl(data, context, isChainRootElement).then(function(response) {
        pushObject.sprite_url = response;
    });

    return pushObject;
}

function setName(data, isChainRootElement) {
    if (isChainRootElement) {
        return data.chain.species.name;
    }
    if (!isChainRootElement) {
        return data.species.name;
    }
}

function setEvolutionTrigger(data, isChainRootElement) {
    let trigger = [];

    if (!isChainRootElement) {
        Array.prototype.forEach.call(data.evolution_details, evolutionDetails => {
            console.log(evolutionDetails);
            Array.prototype.forEach.call(Object.entries(evolutionDetails), detail => {
                if (detail[1] != null && detail[1] != '') {
                    trigger.push(detail);
                }
            });
        });
    }
    return trigger;
}

function setSpriteUrl(data, context, isChainRootElement) {
    let url = '';
    if (isChainRootElement) {
        url = context.$store.getters.pokeApiWrapper
            .getPokemonByName(data.chain.species.name)
            .then(async function(response) {
                return await response.sprites.front_default;
            })
            .catch(error => {
                throw error;
            });
    }
    if (!isChainRootElement) {
        url = context.$store.getters.pokeApiWrapper
            .getPokemonByName(data.species.name)
            .then(async function(response) {
                return await response.sprites.front_default;
            })
            .catch(error => {
                throw error;
            });
    }

    return url;
}

export { getEvolutionChain };
