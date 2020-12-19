<template>
    <div class="container-fluid">
        <div class="row"> 
            <div class="col-4 col-md-1" v-for="pokemon in kanto" :key="pokemon">
                {{ pokemon }}
            </div>
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
                alt="Pikachu"
            />
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/26.svg"
                alt="Raichu"
            />
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/27.svg"
                alt="Sandshrew"
            />
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
            kanto: [],
            pokedex : {}
        }
    },
    mounted: function() {

        const THIS = this; 

        // get all kanto pokemon
        this.pokedex = this.$store.getters.pokedex;
        this.pokedex.getPokedexByName("kanto")
        .then(function (response) {
            for(let index = 0; index < response.pokemon_entries.length; index++){
                THIS.kanto.push(Object.values(response.pokemon_entries)[index].pokemon_species.name);
            }
        });
    }
}
</script>

<style lang="css">

</style>