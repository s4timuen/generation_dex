<template>
    <div class="container-fluid">
        <div class="row">
            <p class="col-12 bold">{{ $t('sprites-title') }}</p>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3">
                <img :src="getSprite($store.getters.selectedPokemonData, 'front_default')" :alt="$store.getters.selectedPokemonData.name" />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <img :src="getSprite($store.getters.selectedPokemonData, 'back_default')" :alt="$store.getters.selectedPokemonData.name" />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <img :src="getSprite($store.getters.selectedPokemonData, 'front_shiny')" :alt="$store.getters.selectedPokemonData.name" />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <img :src="getSprite($store.getters.selectedPokemonData, 'back_shiny')" :alt="$store.getters.selectedPokemonData.name" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sprite',
    components: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {
        getSprite(data, option) {
            if (Object.keys(this.$store.getters.selectedPokemonData).length != 0) {
                let url;

                switch (option) {
                    case 'front_default':
                        url = data.sprites.front_default;
                        break;
                    case 'back_default':
                        url = data.sprites.back_default;
                        break;
                    case 'front_shiny':
                        url = data.sprites.front_shiny;
                        break;
                    case 'back_shiny':
                        url = data.sprites.back_shiny;
                        break;
                    default:
                        url = data.sprites.front_default;
                }

                return url;
            }
        },
    },
};
</script>

<style scoped lang="css"></style>
