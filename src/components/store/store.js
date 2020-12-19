import Vue from 'vue';
import Vuex from 'vuex';
const Pokedex = require("pokeapi-js-wrapper");

Vue.use(Vuex);

const dexOptions = {
  cache: true,
  cacheImages: true
}

const pokedex = new Pokedex.Pokedex(dexOptions);

const store = new Vuex.Store({
  state: {
    isNavOpen: false,
    pokedex: pokedex
  },
  mutations: {
    setNavOpen(state) {
        state.isNavOpen = !state.isNavOpen;
    }
  },
  getters: {
        isNavOpen: state => state.isNavOpen,
        pokedex: state => state.pokedex
  }
});

export default store;
