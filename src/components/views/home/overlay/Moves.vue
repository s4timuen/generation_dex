<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div v-for="(move, key) in moves" :key="key">
                    <p>{{ move.move.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            this.moves = await getMoves(response);
        },
    },
};
</script>

<style lang="css"></style>
