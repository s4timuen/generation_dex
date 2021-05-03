<template>
    <div class="container-fluid">
        <div class="row">
            <p class="col-12 bold">{{ $t('moves') }}</p>
            <table class="table col-12">
                <thead>
                    <tr>
                        <th scope="col">{{ $t('move-name') }}</th>
                        <th scope="col">{{ $t('move-accuracy') }}</th>
                        <th scope="col">{{ $t('move-power') }}</th>
                        <th scope="col">{{ $t('move-pp') }}</th>
                        <th scope="col">{{ $t('move-priority') }}</th>
                        <th scope="col">{{ $t('move-damage-class') }}</th>
                        <th scope="col">{{ $t('move-type') }}</th>
                    </tr>
                </thead>
                <tbody v-for="(move, key) in moves" :key="key">
                    <tr>
                        <td>{{ capitalize(move.name) }}</td>
                        <td>{{ move.accuracy }}</td>
                        <td>{{ move.power }}</td>
                        <td>{{ move.pp }}</td>
                        <td>{{ move.priority }}</td>
                        <td>{{ capitalize(move.damage_class.name) }}</td>
                        <td>{{ capitalize(move.type.name) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/components/helpers/utilities.js';
import { getMoves } from '@/components/helpers/moves.js';

export default {
    name: 'Moves',
    components: {},
    data: function() {
        return {
            moves: {},
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: async function(response) {
            this.moves = await getMoves(response, this);
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
