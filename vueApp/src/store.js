import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


// export const storeInstance = {
//     state: {
//       count: 0,
//     },
//     mutations: {
//       increment(state) {
//         state.count++;
//       //   console.log(state.count)
  
//       },
//       decrement(state) {
//         state.count--;
//       //   console.log(state.count)
//       },
//     },
//     actions: {
//       INCREMENT({ commit }) {
//         commit('increment');
//       },
//       DECREMENT({ commit }) {
//         commit('decrement');
//       },
//     },
//   }

let storeInstance = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    //   console.log(state.count)

    },
    decrement(state) {
      state.count--;
    //   console.log(state.count)
    },
  },
  actions: {
    INCREMENT({ commit }) {
      commit('increment');
    },
    DECREMENT({ commit }) {
      commit('decrement');
    },
  },
});

storeInstance._vue = Vue;

export {storeInstance}
