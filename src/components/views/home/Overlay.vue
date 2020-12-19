<template>
    <div class="overlay">
        <div class="overlay-backdrop" @click="closeOverlayPanel" v-if="isOverlayOpen"></div>
        <div v-if="isOverlayOpen" class="overlay-panel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6 offset-3">
                        {{ pokemon.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Overlay',
    components: {

    },
    props: {
        pokemon: {
            type: Object,
            required: false
        }
    },
    computed: {
        isOverlayOpen() {
            return this.$store.getters.isOverlayOpen;
        }
    },
    methods: {
        closeOverlayPanel() {
            this.$store.commit('setOverlayOpen');
        }
    }
}
</script>

<style>

.overlay-backdrop {
    background-color: rgba(0,0,0,.5);
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
    width: 66.6%;
}
</style>