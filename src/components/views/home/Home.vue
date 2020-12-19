<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-xs-4 col-md-1">
                <p>{{ test }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {

    },
    data: function() {
        return {
            test: "test",
            pokedex : {}
        }
    },
    mounted: function() {

        const THIS = this; // because promise

        this.pokedex = this.$store.getters.pokedex;
        this.pokedex.getPokemonByName("eevee").then(function (response) {THIS.test = response.name});
    }
}
</script>

<style lang="css">

</style>