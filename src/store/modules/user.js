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
      const token = localStorage.getItem("TOKEN");
      if (token) {
        commit("setToken", token);
        Api.token = token;
      }
      const user = JSON.parse(localStorage.getItem("USER"));
      if (user) {
        commit("setUser", user);
      }
    },

    updateToken({ commit }, { token }) {
      localStorage.setItem("TOKEN", token);
      commit("setToken", token);
      Api.token = token;
    },

    updateUser({ commit }, user) {
      localStorage.setItem("USER", JSON.stringify(user));
      commit("setUser", user);
    },

    removeToken({ commit }) {
      localStorage.removeItem("TOKEN");
      commit("setToken", null);
      Api.token = null;
    },

    removeUser({ commit }) {
      localStorage.removeItem("USER");
      commit("setUser", null);
    },

    async login({ dispatch }, { credentials }) {
      const result = await UserApi.login(credentials);
      dispatch("updateToken", { token: result.token });
      await dispatch("getCurrentUser");
    },

    async logout({ dispatch }) {
      await UserApi.logout();
      dispatch("removeToken");
      dispatch("removeUser");
    },

    async getCurrentUser({ state, dispatch }) {
      if (state.user) return state.user;
      const result = await UserApi.get();
      dispatch("updateUser", result);
    },

    async addUser({ dispatch }, { newUser }) {
      const result = await UserApi.add(newUser);
      dispatch("updateUser", result);
    },

    async verifyEmail({ state }, { code }) {
      await UserApi.verify(state.user.email, code);
    },

    async resendVerificationEmail({ state }) {
      await UserApi.resend_verify(state.user.email);
    },

    async deleteCurrentUser({ dispatch }) {
      await UserApi.delete();
      dispatch("removeToken");
      dispatch("removeUser");
    },

    async editCurrentUser({ dispatch }, { user }) {
      const result = UserApi.edit(user);
      dispatch("updateUser", result);
    },

    async getCurrentRoutines({ commit }) {
      const result = await UserApi.routines();
      commit("setRoutines", result);
      return result;
    },
  },
};
