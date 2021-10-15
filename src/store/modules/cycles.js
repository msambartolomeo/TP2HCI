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
      alert(state.routineID);
      for (let cycle of cycleArray) {
        let result = await CycleApi.add(
          state.routineID,
          cycle.cycle,
          controller
        );
        commit("push", result);
      }
    },
    async get({ state, commit }, routineID) {
      if (routineID === state.routineID) return state.cycles;
      const result = await CycleApi.get(routineID);
      commit("setRoutineID", routineID);
      for (let ex of result.content) {
        commit("push", ex);
      }
      return result.content;
    },
  },
};
