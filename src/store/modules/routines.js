import { RoutineApi } from "../../../api/routines";

export default {
  namespaced: true,
  state: {
    routines: [],
  },
  getters: {
    findIndex(state) {
      return (routine) => {
        return state.routines.findIndex((item) => (item.id = routine.id));
      };
    },
  },
  mutations: {
    push(state, routine) {
      state.routines.push(routine);
    },
    replace(state, index, routine) {
      state.routines[index] = routine;
    },
    splice(state, index) {
      state.routines.splice(index, 1);
    },
    replaceAll(state, routine) {
      state.routines = routine;
    },
  },
  actions: {
    async create({ getters, commit }, routine) {
      const result = await RoutineApi.add(routine);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },
    async modify({ getters, commit }, routine) {
      const result = await RoutineApi.modifyRoutine(routine);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },
    async get({ state, getters, commit }, routine) {
      const index = getters.findIndex(routine);
      if (index >= 0) return state.routines[index];
      const result = await RoutineApi.getRoutine();
      commit("push", result);
      return result;
    },
    async getRoutines({ commit }, controller) {
      const result = await RoutineApi.getRoutines(controller);
      commit("replaceAll", result);
      return result;
    },
  },
};
