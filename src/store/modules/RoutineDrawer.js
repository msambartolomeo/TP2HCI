export default {
  namespaced: true,
  state: {
    var1: 12,
    var2: 0,
    drawerState: false,
  },
  mutations: {
    open(state) {
      state.var1 = 8;
      state.var2 = 4;
    },
    close(state) {
      state.var1 = 12;
      state.var2 = 0;
    },
  },
  actions: {
    changeDrawerState({ state, commit }) {
      if (state.drawerState) {
        commit("open");
      } else {
        commit("close");
      }
    },
    drawerClose({ commit }) {
      commit("close");
    },
  },
};
