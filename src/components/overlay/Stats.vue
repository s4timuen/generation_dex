<template>
    <div class="container-fluid">
        <div class="row">
            <p class="col-12 bold">{{ $t('base-stats-title') }}</p>
            <table class="col-12 table-borderless">
                <thead>
                    <tr>
                        <th scope="col">{{ $t('base-stats-hp') }}</th>
                        <th scope="col">{{ $t('base-stats-attack') }}</th>
                        <th scope="col">{{ $t('base-stats-deffence') }}</th>
                        <th v-if="dataFilter == 'generation-i'" scope="col">{{ $t('base-stats-special') }}</th>
                        <th v-if="dataFilter != 'generation-i'" scope="col">{{ $t('base-stats-special-attack') }}</th>
                        <th v-if="dataFilter != 'generation-i'" scope="col">{{ $t('base-stats-special-defense') }}</th>
                        <th scope="col">{{ $t('base-stats-speed') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ baseStats.hp }}</td>
                        <td>{{ baseStats.attack }}</td>
                        <td>{{ baseStats.defense }}</td>
                        <td v-if="dataFilter == 'generation-i'">{{ baseStats.special }}</td>
                        <td v-if="dataFilter != 'generation-i'">{{ baseStats.specialAttack }}</td>
                        <td v-if="dataFilter != 'generation-i'">{{ baseStats.specialDefense }}</td>
                        <td>{{ baseStats.speed }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getBaseStats } from '@/helpers/baseStats.js';

export default {
    name: 'Stats',
    components: {},
    data: function() {
        return {
            baseStats: {
                hp: 0,
                attack: 0,
                defense: 0,
                special: 0,
                specialAttack: 0,
                specialDefense: 0,
                speed: 0,
            },
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
        dataFilter: function() {
            return this.$store.getters.dataFilter;
        },
    },
    watch: {
        data: function(response) {
            this.baseStats = getBaseStats(response, this);
        },
    },
};
</script>

<style scoped lang="css"></style>
