<template>
    <div class="container-fluid">
        <div class="row">
            <div v-for="(generation, key) in $store.getters.nationalDex" :key="key" :id="key">
                <div class="row">
                    <div
                        class="col-4 col-md-3 col-lg-2 col-xl-1"
                        v-for="(pokemon, key) in generation"
                        :key="key"
                        :id="pokemon.pokemon_species.name"
                        @click.prevent="openOverlay(pokemon.pokemon_species.name, $store.getters.dataFilter)"
                    >
                        <img class="img" :src="getImgUrl(pokemon.entry_number)" :alt="pokemon.pokemon_species.name" />
                        <div>{{ capitalize(pokemon.pokemon_species.name) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <Overlay />
    </div>
</template>

<script>
import { capitalize } from '@/components/helpers/utilities.js';
import { showHideGenerationDivs } from '@/components/helpers/genDivsVisibility.js';
import { getDefaultSpriteName } from '@/components/helpers/checkDiffForms.js';

import Overlay from '@/components/views/home/overlay/Overlay.vue';

export default {
    name: 'Home',
    components: {
        Overlay,
    },
    data: function() {
        return {};
    },
    methods: {
        getImgUrl: function(key) {
            return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' + key + '.png';
        },
        openOverlay: function(name) {
            const THIS = this;
            let pokemonName = getDefaultSpriteName(name);

            this.$store.getters.pokeApiWrapper
                .getPokemonByName(pokemonName)
                .then(function(response) {
                    THIS.$store.commit('setSelectedPokemonData', response);
                })
                .catch(error => {
                    throw error;
                });

            this.$store.commit('setOverlayOpen');
        },
        capitalize,
    },
    computed: {
        dataFilter: function() {
            return this.$store.getters.dataFilter;
        },
    },
    watch: {
        dataFilter: function(dataFilter) {
            showHideGenerationDivs(dataFilter);
        },
    },
    mounted: function() {
        // get default pokemon
        let dex = 'national';
        let nationalDex = {
            'generation-i': [],
            'generation-ii': [],
            'generation-iii': [],
            'generation-iv': [],
            'generation-v': [],
            'generation-vi': [],
            'generation-vii': [],
            'generation-viii': [],
        };

        this.$store.getters.pokeApiWrapper
            .getPokedexByName(dex)
            .then(function(response) {
                for (let index = 0; index < response.pokemon_entries.length; index++) {
                    // categorize pokemon in generations
                    if (index >= 0 && index < 151) {
                        nationalDex['generation-i'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 151 && index < 251) {
                        nationalDex['generation-ii'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 251 && index < 386) {
                        nationalDex['generation-iii'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 386 && index < 493) {
                        nationalDex['generation-iv'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 493 && index < 649) {
                        nationalDex['generation-v'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 649 && index < 721) {
                        nationalDex['generation-vi'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 721 && index < 809) {
                        nationalDex['generation-vii'].push(Object.values(response.pokemon_entries)[index]);
                    }
                    if (index >= 809 && index < 897) {
                        nationalDex['generation-viii'].push(Object.values(response.pokemon_entries)[index]);
                    }
                }
            })
            .catch(error => {
                throw error;
            });

        this.$store.commit('setNationalDex', nationalDex);
    },
};
</script>

<style lang="css">
.img {
    max-width: 100%;
    max-height: 100%;
}
</style>
