<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-12 col-sm-6">
                <img  :src="getSprite($store.getters.pokemonData, 'front_default')" :alt="$store.getters.pokemonData.name"/>
            </div>
            <div class="col-12 col-sm-6">
                <img  :src="getSprite($store.getters.pokemonData, 'back_default')" :alt="$store.getters.pokemonData.name"/>
            </div>
        </div>
        <div class="row"> 
            <div class="col-12 col-sm-6">
                <img  :src="getSprite($store.getters.pokemonData, 'front_shiny')" :alt="$store.getters.pokemonData.name"/>
            </div>
            <div class="col-12 col-sm-6">
                <img  :src="getSprite($store.getters.pokemonData, 'back_shiny')" :alt="$store.getters.pokemonData.name"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Sprite",
    components: {

    },
    data() {
        return {
        
        }
    },
    mounted() {
      
    },
    methods: {
        getSprite(data, option) {

            let url;

            switch(option) {
                case "front_default":
                    url = data.sprites.front_default;
                    break;
                case "back_default":
                    url = data.sprites.back_default;
                    break;
                case "front_shiny":
                    url = data.sprites.front_shiny;
                    break;
                case "back_shiny":
                    url = data.sprites.back_shiny;
                    break;
                default:
                    url = data.sprites.front_default;
            }

            return url;
        }
    }
}
</script>

<style lang="css">

</style>