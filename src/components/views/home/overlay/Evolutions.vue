<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-4">
                <div v-for="(evolition, key) in evolutionChain" :key="key">{{ evolution.name }} -></div>
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
            evolutionChain: {},
        }
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData
        },
    },
    watch: {
        data: function(data) {
            const THIS = this

            if (Object.keys(data).length != 0) {
                getEvolutionChain(this, this.$store.getters.dataFilter)
                    .then(function(response) {
                        THIS.evolutionChain = response
                    })
                    .catch(error => {
                        throw error
                    })
            }
        },
    },
}
</script>

<style lang="css"></style>
