<template>
    <div class="container-fluid">
        <div class="row">
            <p class="col-12 bold">{{ $t('evolutions-title') }}</p>
        </div>
        <div class="row">
            <div class="col-12 col-sm-3" v-for="(evolutionStage, key) in evolutionChain" :key="key" :id="key">
                <div calss="row" v-for="(evolution, key) in evolutionStage" :key="key">
                    <div class="col-12">{{ capitalize(evolution.name) }}</div>
                    <div class="col-12">
                        <img class="img" :src="evolution.sprite_url" :alt="evolution.name" />
                    </div>
                    <div class="col-12" v-for="(trigger, key) in evolution.evolution_triggers" :key="key">
                        <div class="row">
                            <div class="col-12">{{ $t('evolution-trigger') + trigger.method }}</div>
                            <div class="col-12">{{ $t('evolution-requirement') + resolveRequirement(trigger.requirement) }}</div>
                            <div class="col-12">{{ $t('evolution-method') + trigger.trigger }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvolutionChain } from '@/helpers/evolutions.js';
import { capitalize, hideDivs } from '@/helpers/utilities.js';

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
            },
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: function() {
            const THIS = this;

            getEvolutionChain(this)
                .then(function(response) {
                    THIS.evolutionChain = response;
                })
                .then(function() {
                    if (!THIS.evolutionChain.baby.length) {
                        hideDivs(document, ['baby']);
                    }
                    if (!THIS.evolutionChain.base.length) {
                        hideDivs(document, ['base']);
                    }
                    if (!THIS.evolutionChain.first.length) {
                        hideDivs(document, ['first']);
                    }
                    if (!THIS.evolutionChain.second.length) {
                        hideDivs(document, ['second']);
                    }
                })
                .catch(error => {
                    throw error;
                });
        },
    },
    methods: {
        capitalize,
        hideDivs,
        // resolve requirement name, if requirement is an object
        resolveRequirement: function(requirement) {
            if (requirement instanceof Object) {
                return requirement.name;
            } else {
                return requirement;
            }
        },
    },
};
</script>

<style scoped lang="css"></style>
