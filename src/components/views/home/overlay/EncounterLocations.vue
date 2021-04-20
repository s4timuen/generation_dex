<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <p class="col-12 text-left">{{ $t('encounter-locations-title') }}</p>
                <table class="table col-12">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('encounter-location-name') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(location, key) in encounterLocations" :key="key">
                            <td>
                                <p>
                                    {{ capitalize(location.location_area.name) }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/components/helpers/utilities.js';
import { getEncounterLocations } from '@/components/helpers/encounterLocations.js';

export default {
    name: 'EcounterLocations',
    components: {},
    data() {
        return {
            encounterLocations: [],
        };
    },
    computed: {
        data() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: async function(response) {
            this.encounterLocations = await getEncounterLocations(response, this);
        },
    },
    methods: {
        capitalize,
    },
};
</script>
