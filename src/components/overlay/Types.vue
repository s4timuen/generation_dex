<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="bold">{{ $t('types') }}</div>
                <div v-for="(type, key) in types" :key="key">
                    <p>{{ capitalize(type.type.name) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/helpers/utilities.js';
import { getTypes } from '@/helpers/types.js';

export default {
    name: 'Types',
    components: {},
    data() {
        return {
            types: [],
        };
    },
    computed: {
        data: function() {
            return this.$store.getters.selectedPokemonData;
        },
    },
    watch: {
        data(response) {
            this.types = getTypes(response, this);
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
