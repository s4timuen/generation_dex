<template>
    <div class="container-fluid">
        <div class="row">
            <p class="col-12 text-center bold">{{ $t('efficiencies-defense') }}</p>
            <table class="table col-12">
                <thead>
                    <tr>
                        <th scope="col">{{ $t('efficioncies-multiplier-zero') }}</th>
                        <th scope="col">{{ $t('efficioncies-multiplier-quarter') }}</th>
                        <th scope="col">{{ $t('efficioncies-multiplier-half') }}</th>
                        <th scope="col">{{ $t('efficioncies-multiplier-double') }}</th>
                        <th scope="col">{{ $t('efficioncies-multiplier-four') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p v-for="(type, key) in efficiencies.defense.zero" :key="key">
                                {{ capitalize(type) }}
                            </p>
                        </td>
                        <td>
                            <p v-for="(type, key) in efficiencies.defense.quarter" :key="key">
                                {{ capitalize(type) }}
                            </p>
                        </td>
                        <td>
                            <p v-for="(type, key) in efficiencies.defense.half" :key="key">
                                {{ capitalize(type) }}
                            </p>
                        </td>
                        <td>
                            <p v-for="(type, key) in efficiencies.defense.double" :key="key">
                                {{ capitalize(type) }}
                            </p>
                        </td>
                        <td>
                            <p v-for="(type, key) in efficiencies.defense.four" :key="key">
                                {{ capitalize(type) }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                defense: {
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

<style lang="css">
.table th {
    width: 20%;
}
.table td {
    width: 20%;
}
</style>
