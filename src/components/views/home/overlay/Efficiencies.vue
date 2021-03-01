<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <p>{{ $t('efficiencies-defence') }}</p>
                <div v-for="(efficiency, key) in efficiencies.defence" :key="key">
                    <p v-if="key == 'zero'">{{ $t('efficioncies-multiplier-zero') }}</p>
                    <p v-if="key == 'quarter'">{{ $t('efficioncies-multiplier-quarter') }}</p>
                    <p v-if="key == 'half'">{{ $t('efficioncies-multiplier-half') }}</p>
                    <p v-if="key == 'one'">{{ $t('efficioncies-multiplier-one') }}</p>
                    <p v-if="key == 'double'">{{ $t('efficioncies-multiplier-double') }}</p>
                    <p v-if="key == 'four'">{{ $t('efficioncies-multiplier-four') }}</p>
                    <div v-for="(type, key) in efficiency" :key="key">
                        <p>{{ capitalize(type) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 1 or 2 types per pokemon
import { capitalize } from '@/components/helpers/utilities.js';
import { typeEfficiencies } from '@/components/helpers/typeEfficiencies.js';

export default {
    name: 'Efficiencies',
    components: {},
    data() {
        return {
            efficiencies: {
                defence: {
                    zero: [''],
                    quarter: [''],
                    half: [''],
                    double: [''],
                    four: [''],
                },
            },
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: function(data) {
            const THIS = this;

            if (Object.keys(data).length != 0) {
                let typeOne = data.types[0].type.name;
                let typeTwo = 'none';

                if (data.types.length > 1) {
                    typeTwo = data.types[1].type.name;
                }

                typeEfficiencies(this, typeOne, typeTwo, this.$store.getters.dataFilter)
                    .then(function(response) {
                        THIS.efficiencies = response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
