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
            pokemon: ""
        }
    },
    methods: {
        getImgUrl: function(key) {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" + key + ".png";
        },
        openOverlay: function(name) {
            this.pokemon = this.checkDiffForme(name);
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
        },
        showDiv(id) {
            document.getElementById(id).setAttribute("style", "display: block");
        },
        hideDiv(id) {
            document.getElementById(id).setAttribute("style", "display: none");
        }
    },
    computed: {
        dataFilter: function() {
            return this.$store.getters.dataFilter;
        }
    },
    watch: {
        dataFilter: function(dataFilter) {

            // filter for generations to display
            switch(dataFilter) {
                case("national"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.showDiv("kalos");                    
                    this.showDiv("alola");                    
                    this.showDiv("galar");
                    break;
                case("kanto"):
                    this.showDiv("kanto");
                    this.hideDiv("johto");                    
                    this.hideDiv("hoen");                    
                    this.hideDiv("sinnoh");                    
                    this.hideDiv("unova");                    
                    this.hideDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                 case("johto"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.hideDiv("hoen");                    
                    this.hideDiv("sinnoh");                    
                    this.hideDiv("unova");                    
                    this.hideDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("hoen"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.hideDiv("sinnoh");                    
                    this.hideDiv("unova");                    
                    this.hideDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("sinnoh"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.hideDiv("unova");                    
                    this.hideDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("unova"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.hideDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("kalos"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.showDiv("kalos");                    
                    this.hideDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("alola"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.showDiv("kalos");                    
                    this.showDiv("alola");                    
                    this.hideDiv("galar");
                    break;
                case("galar"):
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.showDiv("kalos");                    
                    this.showDiv("alola");                    
                    this.showDiv("galar");
                    break;
                default:
                    this.showDiv("kanto");
                    this.showDiv("johto");                    
                    this.showDiv("hoen");                    
                    this.showDiv("sinnoh");                    
                    this.showDiv("unova");                    
                    this.showDiv("kalos");                    
                    this.showDiv("alola");                    
                    this.showDiv("galar");
            }
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