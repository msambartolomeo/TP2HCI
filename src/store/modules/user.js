import { UserApi } from "../../../api/user";
import { Api } from "../../../api/api";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    initialize({ commit }) {
      const token = localStorage.getItem("USER");
      if (token) {
        commit("setToken", token);
        Api.token = token;
      }
    },
    updateToken({ commit }, { token }) {
      localStorage.setItem("USER", token);
      commit("setToken", token);
      Api.token = token;
    },
    async login({ dispatch }, { credentials }) {
      const result = await UserApi.login(credentials);
      dispatch("updateToken", { token: result.token });
    },
    async getCurrentUser({ commit }) {
      const result = await UserApi.get();
      commit("setUser", result);
    },
  },
};
