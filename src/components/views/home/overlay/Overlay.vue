<template>
    <div class="overlay">
        <div class="overlay-backdrop" @click="closeOverlayPanel" v-if="isOverlayOpen"></div>
        <div v-if="isOverlayOpen" class="overlay-panel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        {{ capital(pokemon) }}
                    </div>
                    <Efficiencies :pokemonData="pokemonData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Efficiencies from "@/components/views/home/overlay/Efficiencies.vue";

export default {
    name: 'Overlay',
    components: {
        Efficiencies
    },
    props: {
        pokemon: {
            type: String,
            required: true
        }
    },
    data () {
        return {

        }
    },
    computed: {
        isOverlayOpen() {
            return this.$store.getters.isOverlayOpen;
        },
        pokemonData() {
            return this.getPokemonData(this.pokemon);
        }
    },
    methods: {
        closeOverlayPanel() {
            this.$store.commit('setOverlayOpen');
        },
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        getPokemonData(name) {
            this.$store.getters.pokedex.getPokemonByName(name)
                .then(function(response) { return response; });
        }
    }
}
</script>

<style lang="css">

.overlay-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.overlay-panel {
    overflow-y: auto;
    background-color: #e94848;
    position: fixed;
    left: 16.65%;
    top: 0%;
    height: 100%;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    margin-top: 2.5%;
    width: 66.6%;
}
</style>