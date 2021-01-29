<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-4">
                {{ evolutionChain }}
            </div>
        </div>
    </div>
</template>

<script>
import { getEvolutionChain } from '@/components/helpers/evolutions.js'

export default {
    name: 'Evolutions',
    components: {},
    data() {
        return {
            evolutionChain: {
                baby: [],
                base: [],
                first: [],
                second: [],
                mega: [],
            },
        }
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData
        },
    },
    watch: {
        data: function() {
            const THIS = this

            getEvolutionChain(this)
                .then(function(response) {
                    THIS.evolutionChain = response
                })
                .catch(error => {
                    throw error
                })
        },
    },
}
</script>

<style lang="css"></style>
