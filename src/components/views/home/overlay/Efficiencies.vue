<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <p> Attack </p>
                <div v-for="( efficiency, key ) in efficiencies.attack" :key="key">
                    <ul v-for="( type, key ) in efficiency" :key="key">
                        <li> {{ type }} </li>
                    </ul>
                </div>
            </div>
            <div class="col-6">
                <p> Defence </p>
                 <div v-for="( efficiency, key ) in efficiencies.defence" :key="key">
                    <ul v-for="( type, key ) in efficiency" :key="key">
                        <li> {{ type }} </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { typeEfficiencies } from "@/components/helpers/typeEfficiencies.js"

export default {
    name: "Efficiencies",
    components: {

    },
    props: {
        pokemonData: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data() {
        return {
            efficiencies: {}
        }
    },
    computed: {
        data: function() {
            console.log(this.pokemonData)
            return this.pokemonData;
        }
    },
    watch: {
        data: function(data) {  

            if(Object.keys(data).length != 0) { 

                let typeOne = data.types[0].type.name;
                let typeTwo = "none";

                if(data.types.length > 1) {
                    
                    typeTwo = data.types[1].type.name;
                }

            this.efficiencies = typeEfficiencies(this, typeOne, typeTwo, this.$stire.getters.dataFilter);
            }
        }
    },
    methods: {
        capital(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
    }
}
</script>

<style lang="css">

</style>