import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    test: "test"
  },
  mutations: {
    setTest(state, data) {
        state.test = data;
    }
  },
  getters: {
        test: state => state.test
  }
});

export default store;
