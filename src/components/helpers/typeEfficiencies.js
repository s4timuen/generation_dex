// calculate type efficiencies
function typeEfficiencies(context, typeOne, typeTwo, abilitiyOne, abilityTwo, hiddenAbillity, generation) {

    // get type one object
    context.$store.getters.pokedex.getTypeByName(typeOne)
    .then(async function(response) {

        // get type two object
        let typeOneData = response;
        let typeTwoData = null;

        if(typeTwo != "none") {

            await context.$store.getters.pokedex.getTypeByName(typeTwo)
            .then(function(response) { typeTwoData = response; }); 
        }

        return { typeOneData, typeTwoData } 
    })
    .then(function(response) { 
        
        // calculate base efficiencies
        return getBaseEfficiencies(context, response, generation);
        
    })
    .then(function(response) { 

        // calculate final efficiencies after ability interference
        return getAbilityEfficiencies(context, response, abilitiyOne, abilityTwo, hiddenAbillity);
    })
    .catch(error => { throw error; });
}

// calculate base efficiencies
function getBaseEfficiencies(context, typesObject, generation) {

    let efficiencies = {
        "attack": {
            "zero": [],
            "quarter": [],
            "half": [],
            "double": [],
            "four": []
        },
        "defence": {
            "zero": [],
            "quarter": [],
            "half": [],
            "double": [],
            "four": []
        }
    }  

    console.log(typesObject)

    // generation specific changes to efficiencies
    switch(generation) {
        case "national":
            break;
        case "kanto":
            typesObject = deleteType(typesObject, "fairy");
            typesObject = deleteType(typesObject, "steel");
            typesObject = deleteType(typesObject, "dark");
            typesObject = changeEfficiency(context, typesObject, "poison", "bug", 2); 
            typesObject = changeEfficiency(context, typesObject, "bug", "poison", 2);
            typesObject = changeEfficiency(context, typesObject, "ghost", "psychic", 0);
            typesObject = changeEfficiency(context, typesObject, "ice", "fire", 1);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            break;
        case "johto":
            typesObject = deleteType(typesObject, "fairy");
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            break;
        case "hoen":
            typesObject = deleteType(typesObject, "fairy");
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            break;
        case "sinnoh":
            typesObject = deleteType(typesObject, "fairy");
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            break;
        case "unova":
            typesObject = deleteType(typesObject, "fairy");
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            typesObject = changeEfficiency(context, typesObject, "ghost", "steel", 0.5);
            break;
        case "kalos":
            break;
        case "alola":
            break;
        case "galar":
            break;
        default:
            break;
    }

    // base efficiencies for single type
    if(typesObject.typeOneData != null && typesObject.typeTwoData == null) {

        // as attacker
        efficiencies.attack.zero = typesObject.typeOneData.damage_relations.no_damage_to;
        efficiencies.attack.half = typesObject.typeOneData.damage_relations.half_damage_to;
        efficiencies.attack.double = typesObject.typeOneData.damage_relations.double_damage_to;

        // as defender
        efficiencies.defence.zero = typesObject.typeOneData.damage_relations.no_damage_from;
        efficiencies.defence.half = typesObject.typeOneData.damage_relations.half_damage_from;
        efficiencies.defence.double = typesObject.typeOneData.damage_relations.double_damage_from;
    }

    // base efficiencies for dual type
    if(typesObject.typeOneData != null && typesObject.typeTwoData != null) {

        context.$store.getters.pokedex.getTypesList() 
        .then(function(response) {

            for(let index = 1; index < 19; index++) { 

                let type = Object.value(response.results[index]);

                // as attacker
                let finalMultiplierAttack = getFinalBaseMultiplier("attack", type, typesObject.typeOneData.damage_relations, typesObject.typeTwoData.damage_relations);
                    
                switch(finalMultiplierAttack) {
                    case 0:
                        efficiencies.attack.zero.push(type);
                        break;
                    case 0.25:
                        efficiencies.attack.quarter.push(type);
                        break;
                    case 0.5:
                        efficiencies.attack.half.push(type);
                        break;
                    case 2:
                        efficiencies.attack.double.push(type);
                        break;
                    case 4:
                        efficiencies.attack.four.push(type);
                        break;
                    default:
                        break;
                }
                    
                // as defender
                let finalMultiplierDefence = getFinalBaseMultiplier("defence", type, typesObject.typeOneData.damage_relations, typesObject.typeTwoData.damage_relations);

                switch(finalMultiplierDefence) {
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

    // as attacker
    if(role == "attack") {

        // multiplier type one
        for(const [key, entry] of Object.entries(damageRelationsOne)) { 

            for(const value of entry) {

                if(key.contains("damage_to") && value.name == type) {

                    switch(key) {
                        case "no_demage_to":
                            multiplierOne = 0;
                            break;
                        case "half_damage_to":
                            multiplierOne = 0.5;
                            break;
                        case "double_damage_to":
                            multiplierOne = 2;
                            break;
                        default:
                            multiplierOne = 1;
                    } 
                }
            }

        }
        
        // multiplier type two
        for(const [key, entry] of Object.entries(damageRelationsTwo)) { 

            for(const value of entry) {

                if(key.contains("damage_to") && value.name == type) {

                    switch(key) {
                        case "no_demage_to":
                            multiplierTwo = 0;
                            break;
                        case "half_damage_to":
                            multiplierTwo = 0.5;
                            break;
                        case "double_damage_to":
                            multiplierTwo = 2;
                            break;
                        default:
                            multiplierTwo = 1;
                    } 
                }
            }
        }
    }

    // as defender
    if(role == "defence") {

        // multiplier type one
        for(const [key, entry] of Object.entries(damageRelationsOne)) { 

            for(const value of entry) {

                if(key.contains("damage_from") && value.name == type) {

                    switch(key) {
                        case "no_demage_from":
                            multiplierOne = 0;
                            break;
                        case "half_damage_from":
                            multiplierOne = 0.5;
                            break;
                        case "double_damage_from":
                            multiplierOne = 2;
                            break;
                        default:
                            multiplierOne = 1;
                    } 
                }
            }

        }
        
        // multiplier type two
        for(const [key, entry] of Object.entries(damageRelationsTwo)) { 

            for(const value of entry) {

                if(key.contains("damage_from") && value.name == type) {

                    switch(key) {
                        case "no_demage_from":
                            multiplierTwo = 0;
                            break;
                        case "half_damage_from":
                            multiplierTwo = 0.5;
                            break;
                        case "double_damage_from":
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
    for(const entry of Object.entries(typesObject)) {

        for(const subEntry of Object.entries(entry.demage_relations)) {

            for(const [key, value] of Object.entries(subEntry)) {
        
                if(value.name == type) {
        
                    delete [key, value];
                }
            }
        }
    }

    return typesObject;
}

function changeEfficiency(context, typesObject, attackType, defenceType, newValue) {

    // change efficiency values
    for(const entry of Object.entries(typesObject)) { // entry -> typeOneData

        for(const [key, subEntry] of Object.entries(entry.damage_relations)) { // value -> double_damage_to

            // as attacker
            if(key.contains("damage_to")) {

                for(const [key, value] of Object.entries(subEntry)) {  

                    if(value.name == attackType) { 
        
                        delete value[key];
        
                        let pushObject;
                        pushObject.name = defenceType;
                        pushObject.url = getTypeUrl(context, defenceType);
        
                        switch(newValue) {
                            case 0:
                                entry.damage_relations.no_damage_to.push(pushObject);
                                break;
                            case 0.5:
                                entry.damage_relations.half_damage_to.push(pushObject);
                                break;
                            case 2:
                                entry.damage_relations.double_damage_to.push(pushObject);
                                break;
                            default:
                                break;
                        }                
                    }
                }
            }

            // as defender
            if(key.contains("damage_from")) {

                for(const [key, value] of Object.entries(subEntry)) {  

                    if(value.name == defenceType) { 
        
                        delete value[key];
        
                        let pushObject;
                        pushObject.name = attackType;
                        pushObject.url = getTypeUrl(context, attackType);
        
                        switch(newValue) {
                            case 0:
                                entry.damage_relations.no_damage_from.push(pushObject);
                                break;
                            case 0.5:
                                entry.damage_relations.half_damage_from.push(pushObject);
                                break;
                            case 2:
                                entry.damage_relations.double_damage_from.push(pushObject);
                                break;
                            default:
                                break;
                        }                
                    }
                }
            }            
        }
    }

    return typesObject;
}

function getTypeUrl(context, type) {

    context.$store.getters.pokedex.getTypeByName(type)
        .then(function(response) {

        let number = response.id;

        return "https://pokeapi.co/api/v2/type/" + number+ "/"; 
    }).catch(error => { throw error; });
}

function getAbilityEfficiencies(context, baseEfficiencies, abilitiyOne, abilityTwo, hiddenAbillity) { 

        let finalEfficiencies;

        if(abilitiyOne != "none" || abilityTwo != "none" || hiddenAbillity != "none") {

            // todo

            // calculate final efficiencies with abilities
            // conflicts? do abilities always override calculated efficiencies? -> yes
        }

        return finalEfficiencies;
}

export { typeEfficiencies }
