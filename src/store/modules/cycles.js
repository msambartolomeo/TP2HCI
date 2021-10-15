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
    replace(state, cycles) {
      state.cycles = cycles;
    },
    deleteAll(state) {
      state.cycles = [];
    },
  },
  actions: {
    async deleteAll({ state, commit, dispatch }, controller) {
      dispatch("get", state.routineID);
      for (let cycle of state.cycles) {
        await CycleApi.delete(state.routineID, cycle.id, controller);
        commit("deleteAll");
      }
    },
    async addAll({ state, commit, dispatch }, { cycleArray, controller }) {
      await dispatch("deleteAll");
      for (let cycle of cycleArray) {
        let result = await CycleApi.add(
          state.routineID,
          cycle.cycle,
          controller
        );
        commit("push", result);
      }
    },
    async get({ commit }, routineID) {
      const result = await CycleApi.get(routineID);
      commit("setRoutineID", routineID);
      commit("replace", result.content);
      return result.content;
    },
  },
};
