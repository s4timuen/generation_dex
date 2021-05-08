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
                            <div class="col-12">{{ $t('evolution-requirement') + trigger.requirement }}</div>
                            <div class="col-12">{{ $t('evolution-method') + trigger.trigger }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvolutionChain } from '@/components/helpers/evolutions.js';
import { capitalize } from '@/components/helpers/utilities.js';
import { hideDiv } from '@/components/helpers/utilities.js';

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
                        hideDiv('baby');
                    }
                    if (!THIS.evolutionChain.base.length) {
                        hideDiv('base');
                    }
                    if (!THIS.evolutionChain.first.length) {
                        hideDiv('first');
                    }
                    if (!THIS.evolutionChain.second.length) {
                        hideDiv('second');
                    }
                })
                .catch(error => {
                    throw error;
                });
        },
    },
    methods: {
        capitalize,
        hideDiv,
    },
};
</script>

<style lang="css"></style>
