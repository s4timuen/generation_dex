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

                    let evolutionChain = {
                        baby: [],
                        base: [],
                        first: [],
                        second: [],
                        mega: [],
                    };

                    console.log(response);

                    // https://jsonformatter.curiousconcept.com/#
                    // see data structure

                    // start from baby stage
                    if (response.chain.is_baby) {
                        evolutionChain.baby.push(response.chain.species.name); // baby // getData(response)

                        console.log(response.chain.evolves_to instanceof Array);

                        Array.prototype.forEach.call(response.chain.evolves_to, baseStageElement => {
                            evolutionChain.base.push(baseStageElement.species.name); // base

                            Array.prototype.forEach.call(baseStageElement.evolves_to, firstStageElement => {
                                evolutionChain.first.push(firstStageElement.species.name); // first

                                Array.prototype.forEach.call(firstStageElement.evolves_to, secondStageElement => {
                                    evolutionChain.second.push(secondStageElement.species.name); // second

                                    Array.prototype.forEach.call(secondStageElement.evolves_to, megaStageElement => {
                                        evolutionChain.mega.push(megaStageElement.species.name); // mega
                                    });
                                });
                            });
                        });
                    }

                    // start from base stage
                    if (!response.chain.is_baby) {
                        evolutionChain.base.push(response.chain.species.name); // base

                        Array.prototype.forEach.call(response.chain.evolves_to, firstStageElement => {
                            evolutionChain.first.push(firstStageElement.species.name); // first

                            Array.prototype.forEach.call(firstStageElement.evolves_to, secondStageElement => {
                                evolutionChain.second.push(secondStageElement.species.name); // second

                                Array.prototype.forEach.call(secondStageElement.evolves_to, megaStageElement => {
                                    evolutionChain.mega.push(megaStageElement.species.name); // mega
                                });
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

/** 
function setName(response) {

    return response.chain.species.name;
}

function setEvolutionTrigger(data) {

    // if evolution trigger has changed get generation speciffic 

    // from chain, if not exception defined
    // context.$store.getters.dataFilter
    return data;
}

function setBreedingTrigger(data) {

    // if breeding trigger has changed get generation specific
    return data; 
}

function setSpriteUrl(data) {

    // set sprite url
    return data;
}

function getData(data) {

    let pushObject = {
        "name": "", 
        "evolution_trigger": "none",
        "breeding_trigger": "none",
        "sprite_url": "",
    }

    pushObject.name = setName(data);
    pushObject.evolution_trigger = setEvolutionTrigger(data);
    pushObject.breeding_trigger = setBreedingTrigger(data);
    pushObject.setSpriteUrl = setSpriteUrl(data);

    return pushObject;
}
*/

export { getEvolutionChain };
