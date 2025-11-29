import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        themeDark: true,
        endLoading: false,
        userId: 0,
        user: null,
        isApiLoading: 0,
    },

    mutations: {
        theme(isDark) {
            state.themeDark = isDark;
        }
    }
});

export default store;



// WEBPACK FOOTER //
// ./src/store.js