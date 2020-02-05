import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        selectedPlanet: 'sun',
        planetRotation: {
            z: 0,
            y: 0,
            x: 0
        }
    },

    mutations: {
        SET_SELECTED_PLANET(state, payload) {
            state.selectedPlanet = payload
        },
        SET_PLANET_ROTATION(state, payload) {
            state.planetRotation = payload
        }
    },

    actions: {
        SELECT_PLANET({
            commit
        }, payload) {
            commit('SET_SELECTED_PLANET', payload)
        },
        SET_PLANET_ROTATION({
            commit
        }, payload) {
            commit('SET_PLANET_ROTATION', payload)
        },

    },

})