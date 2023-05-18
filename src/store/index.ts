import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        darkMode: false,
    },
    getters: {
        getDarkMode(state) {
            return state.darkMode;
        },
    },
    mutations: {
        setDarkMode(state, value) {
            return (state.darkMode = value);
        },
    },
    actions: {},
    modules: {},
});
