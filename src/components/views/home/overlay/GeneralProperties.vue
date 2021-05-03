<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 bold">{{ $t('general-properties-title') }}</div>
            <div class="col-12" v-for="(property, key) in generalProperties" :key="key">
                <p v-if="key == 'base_experience'">{{ $t('general-properties-base-experience') + property }}</p>
                <p v-if="key == 'height'">{{ $t('general-properties-height') + property }}</p>
                <p v-if="key == 'weight'">{{ $t('general-properties-weight') + property }}</p>
                <div v-if="key == 'held_items'">
                    {{ $t('general-properties-held-items') }}
                    <p v-for="(item, key) in property" :key="key">{{ capitalize(item.item.name) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/components/helpers/utilities.js';
import { getGeneralProperties } from '@/components/helpers/generalProperties.js';

export default {
    name: 'GeneralProperties',
    components: {},
    data: function() {
        return {
            generalProperties: {
                base_experience: 0,
                height: 0,
                weight: 0,
                held_items: [],
            },
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data: function(response) {
            this.generalProperties = getGeneralProperties(response, this);
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
