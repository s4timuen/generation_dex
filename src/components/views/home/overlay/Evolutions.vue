<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-3" v-for="(evolutionStage, key) in evolutionChain" :key="key">
                <div v-for="(evolution, key) in evolutionStage" :key="key">
                    {{ capitalize(evolution.name) }}
                    <img class="img" :src="evolution.sprite_url" :alt="evolution.name" />
                    <div>
                        {{ evolution.evolution_triggers }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvolutionChain } from '@/components/helpers/evolutions.js';
import { capitalize } from '@/components/helpers/utilities.js';

export default {
    name: 'Evolutions',
    components: {},
    data() {
        return {
            evolutionChain: {
                baby: [],
                base: [],
                first: [],
                second: [],
            },
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: function() {
            const THIS = this;

            getEvolutionChain(this)
                .then(function(response) {
                    THIS.evolutionChain = response;
                })
                .catch(error => {
                    throw error;
                });
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css">
.img {
    max-width: 100%;
    max-height: 100%;
}
</style>
