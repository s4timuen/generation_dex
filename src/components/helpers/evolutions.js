// get edition specific evolution chain and triggers
// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_with_branched_evolutions

// todo: mega evolutions ?

function getEvolutionChain(context) {
    return context.$store.getters.pokeApiWrapper
        .resource(context.$store.getters.selectedPokemonData.species.url)
        .then(async function(response) {
            // get first element of evolution chain
            return await context.$store.getters.pokeApiWrapper
                .resource(response.evolution_chain.url)
                .then(function(response) {
                    console.log(response);

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
                .then(function(response) {
                    // adjust chain to generation specifict
                    let evolutionChain = deleteUnavailablePokemon(response, context);
                    return evolutionChain;
                })
                .then(function(response) {
                    // todo: check forms (e.g. Persian and Perrserker -> same evolution triggers)
                    let evolutionChain = response;
                    return evolutionChain;
                })
                .then(function(response) {
                    // todo: check generations specific triggers (e.g. Magnezone)
                    let evolutionChain = response;
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

// alter base evolution chain to generation specific pokemon availability
async function deleteUnavailablePokemon(chain, context) {
    let newChain = {
        baby: [],
        base: [],
        first: [],
        second: [],
    };

    console.log('base chain: ');
    console.log(chain);

    for (let stage of Object.entries(chain)) {
        for (let pokemon of stage[1]) {
            await context.$store.getters.pokeApiWrapper
                .getPokemonByName(pokemon.name)
                .then(async function(response) {
                    await context.$store.getters.pokeApiWrapper
                        .resource(response.species.url)
                        .then(function(response) {
                            console.log(context.$store.getters.dataFilter);
                            console.log(response.name);
                            console.log(response.generation.name);

                            switch (true) {
                                // national
                                case context.$store.getters.dataFilter == '' && stage[0] == 'baby':
                                    newChain.baby.push(pokemon);
                                    break;
                                case context.$store.getters.dataFilter == '' && stage[0] == 'base':
                                    newChain.base.push(pokemon);
                                    break;
                                case context.$store.getters.dataFilter == '' && stage[0] == 'first':
                                    newChain.first.push(pokemon);
                                    break;
                                case context.$store.getters.dataFilter == '' && stage[0] == 'second':
                                    newChain.second.push(pokemon);
                                    break;
                                // kanto
                                case context.$store.getters.dataFilter == 'kanto' && stage[0] == 'baby':
                                    if (response.generation.name == 'generation-i') {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kanto' && stage[0] == 'base':
                                    if (response.generation.name == 'generation-i') {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kanto' && stage[0] == 'first':
                                    if (response.generation.name == 'generation-i') {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kanto' && stage[0] == 'second':
                                    if (response.generation.name == 'generation-i') {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // johto
                                case context.$store.getters.dataFilter == 'johto' && stage[0] == 'baby':
                                    if (response.generation.name == 'generation-i' || response.generation.name == 'generation-ii') {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'johto' && stage[0] == 'base':
                                    if (response.generation.name == 'generation-i' || response.generation.name == 'generation-ii') {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'johto' && stage[0] == 'first':
                                    if (response.generation.name == 'generation-i' || response.generation.name == 'generation-ii') {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'johto' && stage[0] == 'second':
                                    if (response.generation.name == 'generation-i' || response.generation.name == 'generation-ii') {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // hoen
                                case context.$store.getters.dataFilter == 'hoen' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'hoen' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'hoen' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'hoen' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // sinnoh
                                case context.$store.getters.dataFilter == 'sinnoh' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'sinnoh' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'sinnoh' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'sinnoh' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // unova
                                case context.$store.getters.dataFilter == 'unova' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'unova' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'unova' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'unova' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // kalos
                                case context.$store.getters.dataFilter == 'kalos' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kalos' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kalos' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'kalos' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // alola
                                case context.$store.getters.dataFilter == 'alola' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'alola' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'alola' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'alola' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                // galar
                                case context.$store.getters.dataFilter == 'galar' && stage[0] == 'baby':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii' ||
                                        response.generation.name == 'generation-viii'
                                    ) {
                                        newChain.baby.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'galar' && stage[0] == 'base':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii' ||
                                        response.generation.name == 'generation-viii'
                                    ) {
                                        newChain.base.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'galar' && stage[0] == 'first':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii' ||
                                        response.generation.name == 'generation-viii'
                                    ) {
                                        newChain.first.push(pokemon);
                                    }
                                    break;
                                case context.$store.getters.dataFilter == 'galar' && stage[0] == 'second':
                                    if (
                                        response.generation.name == 'generation-i' ||
                                        response.generation.name == 'generation-ii' ||
                                        response.generation.name == 'generation-iii' ||
                                        response.generation.name == 'generation-iv' ||
                                        response.generation.name == 'generation-v' ||
                                        response.generation.name == 'generation-vi' ||
                                        response.generation.name == 'generation-vii' ||
                                        response.generation.name == 'generation-viii'
                                    ) {
                                        newChain.second.push(pokemon);
                                    }
                                    break;
                                default:
                                    break;
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

    console.log('new chain: ');
    console.log(newChain);

    return newChain;
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
    setSpriteUrl(data, context, isChainRootElement).then(function(response) {
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
