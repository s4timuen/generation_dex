<template>
    <div class="container-fluid">
        <div class="row">
            <div v-for="(generation, key) in $store.getters.nationalDex" :key="key" :id="key">
                <div class="row">
                    <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, key) in generation" 
                        :key="key" :id="pokemon.pokemon_species.name" @click.prevent="openOverlay(pokemon.pokemon_species.name, $store.getters.dataFilter)">
                        <img class="img" :src="getImgUrl(pokemon.entry_number)" :alt="pokemon.pokemon_species.name"/>
                        <div>{{ capital(pokemon.pokemon_species.name) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <Overlay/>
    </div>
</template>

<script>
import { showHideGenerationDivs } from "@/components/helpers/genDivsVisibility.js";
import { checkDiffForme } from "@/components/helpers/checkDiffFormes.js"

import Overlay from "@/components/views/home/overlay/Overlay.vue";

export default {
    name: 'Home',
    components: {
        Overlay
    },
    data: function() {
        return {
         
        }
    },
    methods: {
        getImgUrl: function(key) {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" + key + ".png";
        },
        openOverlay: function(name) {

            let pokemon = checkDiffForme(name);
            this.$store.commit('setOverlayOpen');
            this.$store.commit("setPokemonData", this.getPokemonData(pokemon));
            console.log(this.$store.getters.pokemonData)
        },
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        getPokemonData(name) {
            return this.$store.getters.pokedex.getPokemonByName(name)
                .then(function(response) { return response; })
                .catch(error => { throw error; })
        }
    },
    computed: {
        dataFilter: function() {
            return this.$store.getters.dataFilter;
        }
    },
    watch: {
        dataFilter: function(dataFilter) {

            showHideGenerationDivs(dataFilter);
        }
    },
    mounted: function() {

        // get default pokemon
        let dex = "national"; 
        let nationalDex = {
            kanto: [],
            johto: [],
            hoen: [],
            sinnoh: [],
            unova: [],
            kalos: [],
            alola: [],
            galar: []
        };
 
        this.$store.getters.pokedex.getPokedexByName(dex) 
        .then(function (response) {

            for(let index = 0; index < response.pokemon_entries.length; index++){

                // categorize pokemon in generations
                if(index >= 0 && index < 151) {
                    nationalDex.kanto.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 151 && index < 251) {
                    nationalDex.johto.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 251 && index < 386) {
                    nationalDex.hoen.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 386 && index < 493) {
                    nationalDex.sinnoh.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 493 && index < 649) {
                    nationalDex.unova.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 649 && index < 721) {
                    nationalDex.kalos.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 721 && index < 809) {
                    nationalDex.alola.push(Object.values(response.pokemon_entries)[index]);
                }
                if(index >= 809 && index < 897) {
                    nationalDex.galar.push(Object.values(response.pokemon_entries)[index]);
                }
            }
        }).catch(error => { throw error; });

        this.$store.commit("setNationalDex", nationalDex);
    }
}
</script>

<style lang="css">

.img {
    max-width: 100%;
    max-height: 100%;
}
</style>
