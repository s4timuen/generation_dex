<template>
    <div id="app" calss="container-fluid">
        <div class="row nav">
            <Burger class="col-1 d-flex justify-start" />
            <Sidebar />
            <form class="form-inline my-2 my-lg-0 search-form" id="search-form">
                <input class="form-control mr-sm-2" id="search-input" type="text" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" @click.prevent="onSubmit()">
                    {{ $t('navigation-search-button') }}
                </button>
            </form>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
// todo: about page
// todo: SEO

import Burger from '@/components/views/menu/Burger.vue';
import Sidebar from '@/components/views/menu/Sidebar.vue';
import { showDiv, hideDiv, genToIntTranslator } from '@/components/helpers/utilities.js';

export default {
    name: 'App',
    components: {
        Burger,
        Sidebar,
    },
    data: function() {
        return {};
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
                    showDiv('search-form');
                    break;
                default:
                    hideDiv('search-form');
                    break;
            }
        },
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

                    Object.entries(generationDex).forEach(generation => {
                        generation[1].forEach(pokemon => {
                            // valid input (pokemon name)
                            if (input == pokemon.pokemon_species.name) {
                                // pokemon in selected generation
                                if (genToIntTranslator(generation[0]) <= genToIntTranslator(dataFilter)) {
                                    invalidInput = false;
                                    // set $store selectedPokemonData
                                    this.$store.getters.pokeApiWrapper
                                        .getPokemonByName(input)
                                        .then(function(response) {
                                            THIS.$store.commit('setSelectedPokemonData', response);
                                        })
                                        .catch(error => {
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
    mounted() {
        // hide form for direct pokemon search when loaded/reloaded on other path than /home
        if (this.$route.name != 'Home') {
            hideDiv('search-form');
        }
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    display: flex;
    justify-content: space-between;
    background-color: #bd632f;
    padding: 0.5rem 0.8rem;
}

.search-form {
    justify-self: end;
    margin-right: 1%;
}

.bold {
    font-weight: bold;
}
</style>
