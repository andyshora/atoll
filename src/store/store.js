import Vue from 'vue';
import Vuex from 'vuex';
import config from 'config';
import moment from 'moment';
import _ from 'lodash';

// temp
import noise from 'noise/40.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    noise: null,
    sideLength: null
  },
  getters: {
    noise: state => state.noise,
    sideLength: state => state.sideLength,
  },
  mutations: {
    SET_DATA: (state, { noise, sideLength }) => {
      state.noise = noise;
      state.sideLength = sideLength;
    }
  },
  actions: {
    fetchData: ({ commit }) => {
      commit('SET_DATA', { noise, sideLength: 40 });
      // Vue.axios.get(config.noiseURL).then((response) => {
      //   commit('SET_DATA', response.data);
      // });
    }
  }
});
