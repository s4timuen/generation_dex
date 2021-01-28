// get full evolution chain
function getEvolutionChain(context, dataFilter) {
    let evolutionChain = {
        baby: [],
        base: [],
        first: [],
        second: [],
        // mega
    }

    context.$store.getters.pokedex
        .resource(context.$store.getters.pokemonData.species.url)
        .then(async function(response) {
            // get first of evolution chain
            return await context.$store.getters.pokedex
                .resource(response.evolution_chain.url)
                .then(function(response) {
                    return response
                })
                .catch(error => {
                    throw error
                })
        })
        .then(async function(response) {
            // construct full chain from first
            console.log(response)

            for (let index = 0; index < 3; index++) {
                // for all available evolutions

                if (!response.chain.is_baby) {
                    index++
                }
                /**
                 * 0 = baby
                 * 1 = base
                 * 2 = first
                 * 3 = second
                 */

                if (checkEvolutionAvailable(response)) {
                    let pushObject = {
                        name: '',
                        evolution_trigger: 'none',
                        breeding_trigger: 'none',
                        sprite_url: '',
                    }

                    // set name
                    pushObject.evolution_trigger = setEvolutionTrigger(response) // stage specific set
                    setBreedingTrigger(response) // stage specific set
                    setSpriteUrl(response) // stage specific set
                }

                // next evolution
                // what about branching evolutions? -> pokemon and triggers same indices
            }
        })
        .catch(error => {
            throw error
        })

    return { evolutionChain, dataFilter }
}

function checkEvolutionAvailable(data) {
    // delete if not in generation available
}

function setEvolutionTrigger(data) {
    // if evolution trigger has changed get generation speciffic
    // from chain, if not exception defined
}

function setBreedingTrigger(data) {
    // if breeding trigger has changed get generation specific
}

function setSpriteUrl(data) {
    // set sprite url
}

export { getEvolutionChain }
