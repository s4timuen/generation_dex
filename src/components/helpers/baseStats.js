// get base stats of pokemon
function getBaseStats(pokemon) {
    let baseStats = {
        hp: 0,
        attack: 0,
        defence: 0,
        special: 0,
        specialAttack: 0,
        specialDefence: 0,
        speed: 0,
    };

    // defence -> amarican englisch s instead of c
    pokemon.stats.forEach(element => {
        switch (element.stat.name) {
            case 'hp':
                baseStats.hp = element.base_stat;
                break;
            case 'attack':
                baseStats.attack = element.base_stat;
                break;
            case 'defense':
                baseStats.defence = element.base_stat;
                break;
            case 'special':
                baseStats.special = element.base_stat;
                break;
            case 'special-attack':
                baseStats.specialAttack = element.base_stat;
                break;
            case 'special-defense':
                baseStats.specialDefence = element.base_stat;
                break;
            case 'speed':
                baseStats.speed = element.base_stat;
                break;
            default:
                break;
        }
    });

    return baseStats;
}

export { getBaseStats };
