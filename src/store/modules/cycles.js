import { CycleApi } from "../../../api/cycles";

export default {
  namespaced: true,
  state: {
    cycles: [],
    routineID: null,
  },
  mutations: {
    setRoutineID(state, routineID) {
      state.routineID = routineID;
    },
    push(state, cycle) {
      state.cycles.push(cycle);
    },
    deleteAll(state) {
      state.cycles = [];
    },
  },
  actions: {
    async deleteAll({ state, commit }, controller) {
      commit("deleteAll");
      for (let cycle of state.cycles) {
        await CycleApi.delete(state.routineID, cycle.id, controller);
      }
    },
    async addAll({ state, commit, dispatch }, { cycleArray, controller }) {
      dispatch("deleteAll");
      for (let cycle of cycleArray) {
        await CycleApi.add(state.routineID, cycle, controller);
        commit("push", cycle);
      }
    },
  },
};
