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
    updateToken({ commit }, { token }) {
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
