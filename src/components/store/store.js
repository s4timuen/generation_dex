import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isNavOpen: false
  },
  mutations: {
    setNavOpen(state) {
        state.isNavOpen = !state.isNavOpen;
    }
  },
  getters: {
        isNavOpen: state => state.isNavOpen
  }
});

export default store;
