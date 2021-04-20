<template>
    <div class="overlay">
        <div class="overlay-backdrop" @click="closeOverlayPanel" v-if="isOverlayOpen"></div>
        <div v-if="isOverlayOpen" class="overlay-panel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 border-bottom">
                        {{ capitalize(pokemonName) }}
                    </div>
                    <Sprite class="col-12 border-bottom" />
                    <Evolutions class="col-12 border-bottom" />
                </div>
                <div class="row">
                    <Types class="col-12 col-md-4 border-bottom" />
                    <Abilities class="col-12 col-md-4 border-bottom" />
                    <GeneralProperties class="col-12 col-md-4 border-bottom" />
                </div>
                <div class="row">
                    <Efficiencies class="col-12 col-md-12 border-bottom" />
                </div>
                <div class="row">
                    <Stats class="col-12 border-bottom" />
                </div>
                <div class="row">
                    <Moves class="col-12 border-bottom" />
                </div>
                <div class="row">
                    <EncounterLocations class="col-12 border-bottom" />
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
    background-color: #e94848;
    position: fixed;
    left: 16.65%;
    top: 0%;
    height: 100%;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    margin-top: 2.5%;
    width: 66.6%;
}
</style>
