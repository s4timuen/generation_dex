<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, key) in $store.getters.currentData.data" 
                    :key="key" @click.prevent="openOverlay(pokemon.pokemon_species.name)">
                <div>{{ pokemon.pokemon_species.name }}</div>
                <img class="img" :src="getImgUrl(pokemon.pokemon_species.name)" :alt="pokemon.pokemon_species.name"/>
            </div>
        </div>
        <Overlay :pokemon="pokemon"/>
    </div>
</template>

<script>
import Overlay from "@/components/views/home/Overlay.vue";

export default {
    name: 'Home',
    components: {
        Overlay
    },
    data: function() {
        return {
            pokemon: {}
        }
    },
    methods: {
        getImgUrl: function(name) {

            const THIS = this;
            let number;

            this.$store.getters.pokedex.getPokemonByName(name).then(function(response) {
                for(let index = 0; index < response.game_indices.length; index++) {
                
                    if(response.game_indices[index].version.name == THIS.$store.getters.currentData.version) {
                        
                        number = response.game_indices[index].game_index; 
                    }
                    // dex version -> "red-blue" 
                    // pokemon.game_indices[index].version.name -> "red" or "blue"
                    // seems like this exception applies only to these two versions 
                    if((response.game_indices[index].version.name == "red" || response.game_indices[index].version.name == "blue") 
                        && THIS.$store.getters.currentData.version == "red-blue") {

                        number = response.game_indices[index].game_index; 
                    }
                }
                console.log("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/" 
                    + (THIS.$store.getters.currentData).generation + "/" + THIS.$store.getters.currentData.version + "/" + number + ".png");
                return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/" 
                    + (THIS.$store.getters.currentData).generation + "/" + THIS.$store.getters.currentData.version + "/" + number + ".png";   


                // fix 
                // urls loaded after images have been rendered 


            });
        },
        openOverlay: function(name) {

            let THIS = this;

            // get pokemon
            this.$store.getters.pokedex.getPokemonByName(name).then(function (response) {
                THIS.pokemon = response;
            });

            // open overlay
            this.$store.commit('setOverlayOpen');
        }
    },
    mounted: function() {

        // get default pokemon
        if(!this.$store.getters.currentData.data) { 

            let currentData = {
                data: [],
                generation: "",
                version: ""
            };

            let dex = "kanto"; // default
            currentData.generation = "generation-i"; // default
            currentData.version = "red-blue"; // default

 
            this.$store.getters.pokedex.getPokedexByName(dex) 
            .then(function (response) {
                for(let index = 0; index < response.pokemon_entries.length; index++){
                    currentData.data.push(Object.values(response.pokemon_entries)[index]);
                }
            });

            this.$store.commit("setCurrentData", currentData);
        } 
    }
}
</script>

<style lang="css">

.img {
    max-width: 100%;
    max-height: 100%;
}
</style>