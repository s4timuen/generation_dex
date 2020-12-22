<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, key) in $store.getters.nationalDex" 
                    :key="key" @click.prevent="openOverlay(pokemon.pokemon_species.name)">
                <img class="img" :src="getImgUrl(key)" :alt="pokemon.pokemon_species.name"/>
                <div>{{ capital(pokemon.pokemon_species.name) }}</div>
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
            key += 1;
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
        },
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    },
    mounted: function() {

        // get default pokemon
        let dex = "national"; 
        let nationalDex = [];
 
        this.$store.getters.pokedex.getPokedexByName(dex) 
        .then(function (response) {
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