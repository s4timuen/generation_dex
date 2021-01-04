<template>
    <div class="overlay">
        <div class="overlay-backdrop" @click="closeOverlayPanel" v-if="isOverlayOpen"></div>
        <div v-if="isOverlayOpen" class="overlay-panel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        {{ capital(pokemon) }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p> Attack </p>
                        <div v-for="( efficiencie, key ) in efficiencies.attack" :key="key">
                            <ul v-for="( type, key ) in efficiencie" :key="key">
                                <li> {{ type }} </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-6">
                        <p> Defence </p>
                        <div v-for="( efficiencie, key ) in efficiencies.defence" :key="key">
                            <ul v-for="( type, key ) in efficiencie" :key="key">
                                <li> {{ type }} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { typeEfficiencies } from "@/components/helpers/typeEfficiencies.js"

export default {
    name: 'Overlay',
    components: {

    },
    props: {
        pokemon: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            efficiencies: {
                "attack": {
                    "zero": [],
                    "quarter": [],
                    "half": [],
                    "one": [],
                    "two": [],
                    "four": []
                },
                "defence": {
                    "zero": [],
                    "quarter": [],
                    "half": [],
                    "one": [],
                    "two": [],
                    "four": []
                }
            }
        }
    },
    computed: {
        isOverlayOpen() {
            return this.$store.getters.isOverlayOpen;
        }
    },
    watch: {
        // get pokemon data 
        isOverlayOpen(isOverlayOpen) {

            if(isOverlayOpen) {

                // type efficiencies 
                this.efficiencies = typeEfficiencies(this, "bug", "flying", ["compound eye", "none", "tinted eye"], "national");  // test butterfree

                // todo: more
            }
        }
    },
    methods: {
        closeOverlayPanel() {
            this.$store.commit('setOverlayOpen');
        },
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
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
    margin-top: 2.5%;
    width: 66.6%;
}
</style>