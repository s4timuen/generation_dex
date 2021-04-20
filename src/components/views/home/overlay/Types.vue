<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <p>{{ $t('types') }}</p>
                <div v-for="(type, key) in types" :key="key">
                    <p>{{ capitalize(type.type.name) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/components/helpers/utilities.js';
import { getTypes } from '@/components/helpers/types.js';

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
        data: function(response) {
            this.types = getTypes(response, this);
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
