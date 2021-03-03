// calculate type efficiencies
function typeEfficiencies(context, typeOne, typeTwo, generation) {
    // get type one object
    return context.$store.getters.pokeApiWrapper
        .getTypeByName(typeOne)
        .then(async function(response) {
            // get type two object
            let typeOneData = response;
            let typeTwoData = null;

            if (typeTwo != 'none') {
                await context.$store.getters.pokeApiWrapper
                    .getTypeByName(typeTwo)
                    .then(function(response) {
                        typeTwoData = response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }

            return { typeOneData, typeTwoData };
        })
        .then(function(response) {
            // calculate base efficiencies
            return getBaseEfficiencies(context, response, generation);
        })
        .catch(error => {
            throw error;
        });
}

// calculate base efficiencies
function getBaseEfficiencies(context, typesObject, generation) {
    let efficiencies = {
        defence: {
            zero: [],
            quarter: [],
            half: [],
            double: [],
            four: [],
        },
    };

    // generation specific changes to efficiencies
    switch (generation) {
        case 'national':
            break;
        case 'kanto':
            typesObject = deleteType(typesObject, 'fairy');
            typesObject = deleteType(typesObject, 'steel');
            typesObject = deleteType(typesObject, 'dark');
            typesObject = changeEfficiency(context, typesObject, 'poison', 'bug', 2);
            typesObject = changeEfficiency(context, typesObject, 'bug', 'poison', 2);
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'psychic', 0);
            typesObject = changeEfficiency(context, typesObject, 'ice', 'fire', 1);
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'steel', 0.5);
            typesObject = changeEfficiency(context, typesObject, 'dark', 'steel', 0.5);
            break;
        case 'johto':
            typesObject = deleteType(typesObject, 'fairy');
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'steel', 0.5);
            typesObject = changeEfficiency(context, typesObject, 'dark', 'steel', 0.5);
            break;
        case 'hoenn':
            typesObject = deleteType(typesObject, 'fairy');
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'steel', 0.5);
            typesObject = changeEfficiency(context, typesObject, 'dark', 'steel', 0.5);
            break;
        case 'sinnoh':
            typesObject = deleteType(typesObject, 'fairy');
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'steel', 0.5);
            typesObject = changeEfficiency(context, typesObject, 'dark', 'steel', 0.5);
            break;
        case 'unova':
            typesObject = deleteType(typesObject, 'fairy');
            typesObject = changeEfficiency(context, typesObject, 'ghost', 'steel', 0.5);
            typesObject = changeEfficiency(context, typesObject, 'dark', 'steel', 0.5);
            break;
        case 'kalos':
            break;
        case 'alola':
            break;
        case 'galar':
            break;
        default:
            break;
    }

    // base efficiencies for single type
    if (typesObject.typeOneData != null && typesObject.typeTwoData == null) {
        // as defender
        for (const entry of typesObject.typeOneData.damage_relations.no_damage_from) {
            efficiencies.defence.zero.push(entry.name);
        }
        for (const entry of typesObject.typeOneData.damage_relations.half_damage_from) {
            efficiencies.defence.half.push(entry.name);
        }
        for (const entry of typesObject.typeOneData.damage_relations.double_damage_from) {
            efficiencies.defence.double.push(entry.name);
        }
    }

    // base efficiencies for dual type
    if (typesObject.typeOneData != null && typesObject.typeTwoData != null) {
        context.$store.getters.pokeApiWrapper.getTypesList().then(function(response) {
            for (let index = 1; index < 19; index++) {
                let type = Object.values(response.results)[index].name;

                // as defender
                let finalMultiplierDefence = getFinalBaseMultiplier(
                    'defence',
                    type,
                    typesObject.typeOneData.damage_relations,
                    typesObject.typeTwoData.damage_relations
                );

                switch (finalMultiplierDefence) {
                    case 0:
                        efficiencies.defence.zero.push(type);
                        break;
                    case 0.25:
                        efficiencies.defence.quarter.push(type);
                        break;
                    case 0.5:
                        efficiencies.defence.half.push(type);
                        break;
                    case 2:
                        efficiencies.defence.double.push(type);
                        break;
                    case 4:
                        efficiencies.defence.four.push(type);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    return efficiencies;
}

function getFinalBaseMultiplier(role, type, damageRelationsOne, damageRelationsTwo) {
    let multiplierOne = 1;
    let multiplierTwo = 1;

    // as defender
    if (role == 'defence') {
        // multiplier type one
        for (const [key, entry] of Object.entries(damageRelationsOne)) {
            for (const value of entry) {
                if (key.includes('damage_from') && value.name == type) {
                    switch (key) {
                        case 'no_damage_from':
                            multiplierOne = 0;
                            break;
                        case 'half_damage_from':
                            multiplierOne = 0.5;
                            break;
                        case 'double_damage_from':
                            multiplierOne = 2;
                            break;
                        default:
                            multiplierOne = 1;
                    }
                }
            }
        }

        // multiplier type two
        for (const [key, entry] of Object.entries(damageRelationsTwo)) {
            for (const value of entry) {
                if (key.includes('damage_from') && value.name == type) {
                    switch (key) {
                        case 'no_damage_from':
                            multiplierTwo = 0;
                            break;
                        case 'half_damage_from':
                            multiplierTwo = 0.5;
                            break;
                        case 'double_damage_from':
                            multiplierTwo = 2;
                            break;
                        default:
                            multiplierTwo = 1;
                    }
                }
            }
        }
    }

    return multiplierOne * multiplierTwo;
}

function deleteType(typesObject, type) {
    // delete none existing type from type objects
    for (const entry of Object.entries(typesObject)) {
        if (entry[1] != null) {
            for (const subEntry of Object.entries(entry[1].damage_relations)) {
                for (const value of subEntry[1]) {
                    if (value.name == type) {
                        subEntry[1].splice(subEntry[1].indexOf(value), 1);
                    }
                }
            }
        }
    }

    return typesObject;
}

function changeEfficiency(context, typesObject, attackType, defenceType, newValue) {
    // change efficiency values
    for (const entry of Object.entries(typesObject)) {
        if (entry[1] != null) {
            for (const [key, subEntry] of Object.entries(entry[1].damage_relations)) {
                // as defender
                if (key.includes('damage_from')) {
                    for (const value of subEntry) {
                        if (value.name == defenceType) {
                            subEntry.splice(subEntry.indexOf(value), 1);

                            let pushObject = {
                                name: '',
                                url: '',
                            };
                            pushObject.name = attackType;
                            pushObject.url = getTypeUrl(context, attackType);

                            switch (newValue) {
                                case 0:
                                    entry[1].damage_relations.no_damage_from.push(pushObject);
                                    break;
                                case 0.5:
                                    entry[1].damage_relations.half_damage_from.push(pushObject);
                                    break;
                                case 2:
                                    entry[1].damage_relations.double_damage_from.push(pushObject);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }

    return typesObject;
}

function getTypeUrl(context, type) {
    context.$store.getters.pokeApiWrapper
        .getTypeByName(type)
        .then(function(response) {
            let number = response.id;

            return 'https://pokeapi.co/api/v2/type/' + number + '/';
        })
        .catch(error => {
            throw error;
        });
}

export { typeEfficiencies };
