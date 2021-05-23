<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 bold">{{ $t('varieties-title') }}</div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(variety, key) in varieties" :key="key">
                <button class="btn btn-block btn-outline-dark" type="button" @click.prevent="onSubmit(variety.pokemon.name)">
                    {{ capitalize(variety.pokemon.name) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { setSelectedPokemonData, checkVarietyGenerationAvailability, capitalize } from '@/components/helpers/utilities.js';

export default {
    name: 'Varieties',
    components: {},
    data: function() {
        return {};
    },
    computed: {
        varieties: function() {
            let availableVarieties = [];
            this.$store.getters.selectedPokemonVarieties.forEach(variety => {
                if (checkVarietyGenerationAvailability(variety.pokemon.name, this.$store.getters.dataFilter)) {
                    availableVarieties.push(variety);
                }
            });
            return availableVarieties;
        },
    },
    methods: {
        onSubmit: function(name) {
            // set $store selectedPokemonData for selected variety
            setSelectedPokemonData(name, this);
        },
        capitalize,
    },
};
</script>

<style lang="css"></style>
