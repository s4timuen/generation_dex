<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 bold">{{ $t('abilities-title') }}</div>
            <div class="col-12">
                <div class="col-12 col-ms-6 text-left">{{ $t('abilities-one') + capitalize(abilities.abilityOne) }}</div>
                <div class="col-12 col-ms-6 text-left">{{ $t('abilities-two') + capitalize(abilities.abilityTwo) }}</div>
                <div class="col-12 col-ms-6 text-left">{{ $t('abilities-hidden') + capitalize(abilities.hiddenAbility) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
// 1 or 2 abilities per pokemon
// hidden ability for every pokemon
import { capitalize } from '@/helpers/utilities.js';

export default {
    name: 'Abilities',
    components: {},
    data: function() {
        return {
            abilities: {
                abilityOne: '',
                abilityTwo: '',
                hiddenAbility: '',
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
            // no abilities in gen 1 and 2
            if (this.$store.getters.dataFilter != 'generation-i' && this.$store.getters.dataFilter != 'generation-ii') {
                // get abilities
                if (Object.keys(data).length != 0) {
                    this.abilities.abilityOne = data.abilities[0].ability.name;

                    // only one ability
                    if (Object.keys(data.abilities).length == 2 && data.abilities[1].is_hidden == true) {
                        this.abilities.hiddenAbility = data.abilities[1].ability.name;
                    }
                    // with two abilities
                    if (Object.keys(data.abilities).length == 3 && data.abilities[2].is_hidden == true) {
                        this.abilities.abilityTwo = data.abilities[1].ability.name;
                        this.abilities.hiddenAbility = data.abilities[2].ability.name;
                    }
                }
            }
        },
    },
    methods: {
        capitalize,
    },
};
</script>

<style lang="css"></style>
