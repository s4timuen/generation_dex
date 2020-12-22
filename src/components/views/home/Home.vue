<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, key) in $store.getters.nationalDex" 
                    :key="key" @click.prevent="openOverlay(pokemon.pokemon_species.name)">
                <div>{{ pokemon.pokemon_species.name }}</div>
                <img class="img" :src="getImgUrl(key)" :alt="pokemon.pokemon_species.name"/>
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
        getImgUrl: function(key) {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" + key + ".png";
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

        // default national dex with newest data
        // on sidebar klick load specific data but show still all pokemon 
        // except for newer generations disable newer pokemon

        // get default pokemon
        let dex = "national"; // default
        let nationalDex = [];
 
        this.$store.getters.pokedex.getPokedexByName(dex) 
        .then(function (response) {
            console.log(response);
            for(let index = 0; index < response.pokemon_entries.length; index++){
                nationalDex.push(Object.values(response.pokemon_entries)[index]);
            }
        });
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