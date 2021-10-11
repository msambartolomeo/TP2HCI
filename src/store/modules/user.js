import { UserApi } from "../../../api/user";
import { Api } from "../../../api/api";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    routines: [],
  },
  getters: {
    isLoggedIn(state) {
      return state.token != null;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRoutines(state, routines) {
      state.routines = routines;
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

    removeToken({ commit }) {
      localStorage.removeItem("USER");
      commit("setToken", null);
      Api.token = null;
    },

    async login({ dispatch }, { credentials }) {
      const result = await UserApi.login(credentials);
      dispatch("updateToken", { token: result.token });
    },

    async logout({ dispatch, commit }) {
      await UserApi.logout();
      dispatch("removeToken");
      commit("setUser", null);
    },

    async getCurrentUser({ state, commit }) {
      if (state.user) return state.user;
      const result = await UserApi.get();
      commit("setUser", result);
    },

    async addUser({ commit }, { user }) {
      const result = await UserApi.add(user);
      commit("setUser", result);
    },

    async verifyEmail({ state }, { code }) {
      await UserApi.verify(state.user.email, code);
    },

    async resendVerificationEmail({ state }) {
      await UserApi.resend_verify(state.user.email);
    },

    async deleteCurrentUser({ dispatch, commit }) {
      await UserApi.delete();
      dispatch("removeToken");
      commit("setUser", null);
    },

    async editCurrentUser({ commit }, { user }) {
      const result = UserApi.edit(user);
      commit("setUser", result);
    },

    async getCurrentRoutines({ commit }) {
      const result = await UserApi.routines();
      commit("setRoutines", result);
      return result;
    },
  },
};
