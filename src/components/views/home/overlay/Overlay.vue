<template>
    <div class="overlay">
        <div class="overlay-backdrop" @click="closeOverlayPanel" v-if="isOverlayOpen"></div>
        <div v-if="isOverlayOpen" class="overlay-panel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 name">
                        {{ capitalize(pokemonName) }}
                    </div>
                    <Varieties class="col-12 border" />
                </div>
                <div class="row">
                    <Sprite class="col-12 border" />
                    <Evolutions class="col-12 border" />
                </div>
                <div class="row">
                    <Types class="col-12 col-md-4 border" />
                    <Abilities class="col-12 col-md-4 border" />
                    <GeneralProperties class="col-12 col-md-4 border" />
                </div>
                <div class="row">
                    <Efficiencies class="col-12 col-md-12 border" />
                </div>
                <div class="row">
                    <Stats class="col-12 border" />
                </div>
                <div class="row">
                    <Moves class="col-12 border" />
                </div>
                <div class="row">
                    <EncounterLocations class="col-12 border" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sprite from '@/components/views/home/overlay/Sprite.vue';
import Efficiencies from '@/components/views/home/overlay/Efficiencies.vue';
import Types from '@/components/views/home/overlay/Types.vue';
import Abilities from '@/components/views/home/overlay/Abilities.vue';
import Evolutions from '@/components/views/home/overlay/Evolutions.vue';
import Moves from '@/components/views/home/overlay/Moves.vue';
import Stats from '@/components/views/home/overlay/Stats.vue';
import GeneralProperties from '@/components/views/home/overlay/GeneralProperties.vue';
import EncounterLocations from '@/components/views/home/overlay/EncounterLocations.vue';
import Varieties from '@/components/views/home/overlay/Varieties.vue';

import { capitalize } from '@/components/helpers/utilities.js';

export default {
    name: 'Overlay',
    components: {
        Sprite,
        Efficiencies,
        Types,
        Abilities,
        Evolutions,
        Moves,
        Stats,
        EncounterLocations,
        GeneralProperties,
        Varieties,
    },
    data() {
        return {};
    },
    computed: {
        isOverlayOpen() {
            return this.$store.getters.isOverlayOpen;
        },
        pokemonName() {
            let name = '';

            if (Object.keys(this.$store.getters.selectedPokemonData).length != 0) {
                name = this.$store.getters.selectedPokemonData.name;
            }

            return name;
        },
    },
    methods: {
        closeOverlayPanel() {
            this.$store.commit('setOverlayOpen');
        },
        capitalize,
    },
};
</script>

<style lang="css">
.overlay-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.overlay-panel {
    overflow-y: auto;
    background-color: #d8c99b;
    position: fixed;
    left: 16.65%;
    top: 0%;
    height: 95%;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    margin-top: 2%;
    width: 66.6%;
}

.name {
    font-size: larger;
    font-weight: bold;
}
</style>
