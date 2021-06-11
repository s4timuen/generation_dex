<template>
    <form class="form-inline my-2 my-lg-0 search-form" id="search-form">
        <input class="form-control mr-sm-2" id="search-input" type="text" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-dark my-2 my-sm-0" id="search-button" type="submit" @click.prevent="onSubmit()">
            {{ $t('navigation-search-button') }}
        </button>
    </form>
</template>

<script>
import { genToIntTranslator, enableDivs, disableDivs } from '@/components/helpers/utilities.js';

export default {
    name: 'Search',
    components: {},
    data: function () {
        return {
            searchAvailable: false,
        };
    },
    methods: {
        onSubmit() {
            let input = document.getElementById('search-input').value;
            let generationDex = this.$store.getters.nationalDex;
            let dataFilter = this.$store.getters.dataFilter;
            const THIS = this;

            if (generationDex) {
                if (input) {
                    let invalidInput = true;

                    Object.entries(generationDex).forEach((generation) => {
                        generation[1].forEach((pokemon) => {
                            // valid input (pokemon name)
                            if (input == pokemon.pokemon_species.name) {
                                // pokemon in selected generation
                                if (genToIntTranslator(generation[0]) <= genToIntTranslator(dataFilter)) {
                                    invalidInput = false;
                                    // set $store selectedPokemonData
                                    this.$store.getters.pokeApiWrapper
                                        .getPokemonByName(input)
                                        .then(function (response) {
                                            THIS.$store.commit('setSelectedPokemonData', response);
                                        })
                                        .catch((error) => {
                                            throw error;
                                        });
                                    this.$store.commit('setOverlayOpen');
                                }
                                // pokemon not in selected generation
                                if (genToIntTranslator(generation[0]) > genToIntTranslator(dataFilter)) {
                                    invalidInput = false;
                                    alert(this.$t('navigation-search-pokemon-not-available'));
                                }
                            }
                        });
                    });
                    // invalid input (no pokemon name)
                    if (invalidInput) {
                        alert(this.$t('navigation-search-invalid-pokemon-name'));
                    }
                } else {
                    alert(this.$t('navigation-search-empty-input'));
                }
            } else {
                alert(this.$t('navigation-search-no-data'));
            }
        },
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        },
    },
    watch: {
        // show form for direct pokemon search only on /home view
        currentRoute(response) {
            switch (response) {
                case 'Home':
                    enableDivs(document, ['search-input', 'search-button']);
                    break;
                default:
                    disableDivs(document, ['search-input', 'search-button']);
                    break;
            }
        },
    },
    mounted() {
        // hide form for direct pokemon search when loaded/reloaded on other path than /home
        if (this.$route.name != 'Home') {
            disableDivs(document, ['search-input', 'search-button']);
        }
    },
};
</script>

<style scoped lang="css">
.search-form {
    justify-self: end;
}
</style>
