<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-left">{{ $t('base-stats-title') }}</div>
            <div class="col-6">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('base-stats-hp') }}</th>
                            <th scope="col">{{ $t('base-stats-attack') }}</th>
                            <th scope="col">{{ $t('base-stats-deffence') }}</th>
                            <th id="th-special" scope="col">{{ $t('base-stats-special') }}</th>
                            <th id="th-special-attack" scope="col">{{ $t('base-stats-special-attack') }}</th>
                            <th id="th-special-defence" scope="col">{{ $t('base-stats-special-defence') }}</th>
                            <th scope="col">{{ $t('base-stats-speed') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ baseStats.hp }}</td>
                            <td>{{ baseStats.attack }}</td>
                            <td>{{ baseStats.defence }}</td>
                            <td id="td-special">{{ baseStats.special }}</td>
                            <td id="td-special-attack">{{ baseStats.specialAttack }}</td>
                            <td id="td-special-defence">{{ baseStats.specialDefence }}</td>
                            <td>{{ baseStats.speed }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { getBaseStats } from '@/components/helpers/baseStats.js';

// todo: if first gen hide special attack and speciel defence but show special

export default {
    name: 'Stats',
    components: {},
    data: function() {
        return {
            baseStats: {
                hp: 0,
                attack: 0,
                defence: 0,
                special: 0,
                specialAttack: 0,
                specialDefence: 0,
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
            this.baseStats = getBaseStats(response);
        },
        // show/hide special || (special attak && special defence) stat(s)
        dataFilter: function(dataFilter) {
            if (dataFilter == 'kanto') {
                // todo: show/hide table column(s) for special stat or special attack and special defence stats
            }
            if (dataFilter != 'kanto') {
                // todo: show/hide table column(s) for special stat or special attack and special defence stats
            }
        },
    },
};
</script>

<style lang="css"></style>
