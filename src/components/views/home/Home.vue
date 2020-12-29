<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-3 col-lg-2 col-xl-1" v-for="(pokemon, key) in $store.getters.nationalDex" 
                    :key="key" :id="pokemon.pokemon_species.name" @click.prevent="openOverlay(pokemon.pokemon_species.name)">
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
            }).catch(error => { throw error; });

            // open overlay
            this.$store.commit('setOverlayOpen');
        },
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        checkDiffForme(name) {

            // for home default sprite
            switch(name) {
                case("deoxys"):
                    name = "deoxys-normal";
                    break;
                case("wormadam"):
                    name = "wormadam-plant";
                    break;
                case("shaymin"):
                    name = "shaymin-land";
                    break;
                case("giratina"):
                    name = "giratina-altered";
                    break;
                case("darmanitan"):
                    name = "darmanitan-standard";
                    break;
                case("basculin"):
                    name = "basculin-red-striped";
                    break;
                case("tornadus"):
                    name = "tornadus-incarnate";
                    break;
                case("thundurus"):
                    name = "thundurus-incarnate";
                    break;
                case("landorus"):
                    name = "landorus-incarnate";
                    break;
                case("keldeo"):
                    name = "keldeo-ordinary";
                    break;
                case("meloetta"):
                    name = "meloetta-aria";
                    break;
                case("meowstic"):
                    name = "meowstic-male";
                    break;
                case("aegislash"):
                    name = "aegislash-shield";
                    break;
                case("pumpkaboo"):
                    name = "pumpkaboo-average";
                    break;
                case("gourgeist"):
                    name = "gourgeist-average";
                    break;
                case("oricorio"):
                    name = "oricorio-baile";
                    break;
                case("lycanroc"):
                    name = "	lycanroc-midday";
                    break;
                case("wishiwashi"):
                    name = "wishiwashi-solo";
                    break;
                case("minior"):
                    name = "minior-red-meteor";
                    break;
                case("mimikyu"):
                    name = "mimikyu-disguised";
                    break;
                case("toxtricity"):
                    name = "toxtricity-amped";
                    break;
                case("eiscue"):
                    name = "eiscue-ice";
                    break;
                case("indeedee"):
                    name = "indeedee-male";
                    break;
                case("zacian"):
                    name = "zacian-hero";
                    break;
                case("zamazenta"):
                    name = "zamazenta-hero";
                    break;
                case("urshifu"):
                    name = "urshifu-single-strike";
                    break;
                default: 
                    name;
            }
            return name;
        }
    },
    computed: {
        dataFilter: function() {
            return this.$store.getters.dataFilter;
        }
    },
    watch: {
        dataFilter: function(dataFilter) {

            const THIS = this;

            // filter for edition specific pokemon
            for(let index = 0; index < Object.keys(this.$store.getters.nationalDex).length; index++) {
 
                let speciesName = THIS.$store.getters.nationalDex[index].pokemon_species.name; // div id is from here
                let pokemonName = this.checkDiffForme(speciesName); // mapping for .getPokemonByName()

                this.$store.getters.pokedex.getPokemonByName(pokemonName) 
                    .then(function(pokemon) { 

                        document.getElementById(speciesName).setAttribute("style", "display: none"); 

                        for(let index_2 = 0; index_2 < pokemon.game_indices.length; index_2++) {
       
                            if(dataFilter == 'national' || pokemon.game_indices[index_2].version.name == dataFilter) {

                                document.getElementById(speciesName).setAttribute("style", "display: block"); 

                            }
                        }
                     }).catch(error => { throw error; });
            }
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