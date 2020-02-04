import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        selectedPlanet: 'sun'
    },

    mutations: {
        SET_SELECTED_PLANET(state, payload) {
            state.selectedPlanet = payload
        }
    },

    actions: {
        SELECT_PLANET({
            commit
        }, payload) {
            commit('SET_SELECTED_PLANET', payload)
        }
    },

})