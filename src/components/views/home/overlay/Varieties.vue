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
import { setSelectedPokemonData, capitalize } from '@/components/helpers/utilities.js';

export default {
    name: 'Varieties',
    components: {},
    data: function() {
        return {};
    },
    computed: {
        varieties: function() {
            return this.$store.getters.selectedPokemonVarieties;
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
