import baseStatsDifferences from '@/dataAssets/baseStatsDifferences.json';

// get base stats of pokemon
function getBaseStats(pokemon, context) {
    let baseStats = {
        hp: 0,
        attack: 0,
        defense: 0,
        special: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
    };

    let datafilter = context.$store.getters.dataFilter;
    let stats = pokemon.stats;

    // set base stats from data
    stats.forEach(element => {
        switch (element.stat.name) {
            case 'hp':
                baseStats.hp = element.base_stat;
                break;
            case 'attack':
                baseStats.attack = element.base_stat;
                break;
            case 'defense':
                baseStats.defense = element.base_stat;
                break;
            case 'special':
                baseStats.special = element.base_stat;
                break;
            case 'special-attack':
                baseStats.specialAttack = element.base_stat;
                break;
            case 'special-defense':
                baseStats.specialDefense = element.base_stat;
                break;
            case 'speed':
                baseStats.speed = element.base_stat;
                break;
            default:
                break;
        }
    });

    // check for differences
    Object.entries(baseStatsDifferences).forEach(function(entry) {
        if (entry[0] == pokemon.name) {
            entry[1].differences.forEach(function(difference) {
                if (difference.generations.includes(datafilter)) {
                    Object.entries(difference.affected_stats).forEach(function(stat) {
                        switch (stat[0]) {
                            case 'hp':
                                baseStats.hp = stat[1];
                                break;
                            case 'attack':
                                baseStats.attack = stat[1];
                                break;
                            case 'defense':
                                baseStats.defense = stat[1];
                                break;
                            case 'special':
                                baseStats.special = stat[1];
                                break;
                            case 'special_attack':
                                baseStats.specialAttack = stat[1];
                                break;
                            case 'special_defense':
                                baseStats.specialDefense = stat[1];
                                break;
                            case 'speed':
                                baseStats.speed = stat[1];
                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        }
    });
    return baseStats;
}

export { getBaseStats };
