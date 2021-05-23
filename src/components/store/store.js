import Vue from 'vue';
import Vuex from 'vuex';
const PokeApiWrapper = require('pokeapi-js-wrapper');

Vue.use(Vuex);

const dexOptions = {
    cache: true,
    cacheImages: true,
};

const pokeApiWrapper = new PokeApiWrapper.Pokedex(dexOptions);

const store = new Vuex.Store({
    state: {
        isNavOpen: false,
        isOverlayOpen: false,
        pokeApiWrapper: pokeApiWrapper,
        nationalDex: {},
        dataFilter: 'nationa',
        selectedPokemonData: {},
        selectedPokemonVarieties: [],
    },
    mutations: {
        setNavOpen(state) {
            state.isNavOpen = !state.isNavOpen;
        },
        setOverlayOpen(state) {
            state.isOverlayOpen = !state.isOverlayOpen;
        },
        setNationalDex(state, data) {
            state.nationalDex = data;
        },
        setDataFilter(state, edition) {
            state.dataFilter = edition;
        },
        setSelectedPokemonData(state, data) {
            state.selectedPokemonData = data;
        },
        setSelectedPokemonVarieties(state, varieties) {
            state.selectedPokemonVarieties = varieties;
        },
    },
    getters: {
        isNavOpen: state => state.isNavOpen,
        isOverlayOpen: state => state.isOverlayOpen,
        pokeApiWrapper: state => state.pokeApiWrapper,
        nationalDex: state => state.nationalDex,
        dataFilter: state => state.dataFilter,
        selectedPokemonData: state => state.selectedPokemonData,
        selectedPokemonVarieties: state => state.selectedPokemonVarieties,
    },
});

export default store;
