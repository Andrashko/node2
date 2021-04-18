export default {
    state: {
        token: "",
        login: "",
        signIn: false,
    },
    getters: {
        token(state) {
            return state.token;
        },
        login(state) {
            return state.login;
        },
        signIn(state) {
            return state.signIn;
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLogin(state, login) {
            state.login = login;
        },
        setSignIn(state, signIn) {
            state.signIn = signIn;
        },

    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token);
            localStorage.setItem("token", token);
        },
        loadToken({ dispatch }) {
            const token = localStorage.getItem("token");
            dispatch("setToken", token);
        },
        removeToken({ commit }) {
            commit("setToken", "");
            localStorage.removeItem("token");
        },
        logIn({ commit }, login) {
            commit("setLogin", login);
            commit("setSignIn", true);
        },
        logOut({ commit }) {
            commit("setLogin", "");
            commit("setSignIn", false);
        },
    }
}