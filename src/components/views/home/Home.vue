<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, index) in kanto" :key="index" @click.prevent="openOverlay(pokemon.pokemon_species.name)">
                <div>{{ pokemon.pokemon_species.name }}</div>
                <img class="img" :src="getImgUrl(pokemon.entry_number)" :alt="pokemon.pokemon_species.name"/>
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
            kanto: [],
            pokemon: {},
            pokedex : {}
        }
    },
    methods: {
        getImgUrl: function(number) {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/" + number + ".png"
        },
        openOverlay: function(name) {

            let THIS = this;

            // get pokemon
            this.pokedex.getPokemonByName(name).then(function (response) {
                THIS.pokemon = response;
            });

            // open overlay
            this.$store.commit('setOverlayOpen');
        }
    },
    mounted: function() {

        const THIS = this; 

        // get all kanto pokemon
        this.pokedex = this.$store.getters.pokedex;
        this.pokedex.getPokedexByName("kanto")
        .then(function (response) {
            for(let index = 0; index < response.pokemon_entries.length; index++){
                THIS.kanto.push(Object.values(response.pokemon_entries)[index]);
            }
        });
    }
}
</script>

<style lang="css">

.img {
    max-width: 100%;
    max-height: 100%;
}
</style>