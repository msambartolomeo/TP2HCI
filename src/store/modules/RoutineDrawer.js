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
    changerDrawerState(state) {
      state.drawerState = !state.drawerState;
    },
  },
  actions: {
    changeDrawerState({ state, commit }) {
      if (state.drawerState) {
        commit("close");
      } else {
        commit("open");
      }
      commit("changerDrawerState");
    },
    drawerClose({ state, commit }) {
      if (state.drawerState) {
        commit("close");
        commit("changerDrawerState");
      }
    },
  },
};
