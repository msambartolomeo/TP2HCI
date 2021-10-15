import { CycleExercisesApi } from "../../../api/cycleExercises";

export default {
  namespaced: true,
  state: {
    exercises: [],
    cycleID: null,
  },
  mutations: {
    setCycleID(state, cycleID) {
      state.cycleID = cycleID;
    },
    push(state, cycle) {
      state.exercises.push(cycle);
    },
    deleteAll(state) {
      state.exercises = [];
    },
  },
  actions: {
    async deleteAll({ state, commit }, controller) {
      for (let ex of state.exercises) {
        await CycleExercisesApi.delete(state.cycleID, ex.id, controller);
      }
      commit("deleteAll");
    },
    async addAll({ commit }, { exercisesArray, cycleID, controller }) {
      for (let ex of exercisesArray) {
        await CycleExercisesApi.add(
          cycleID,
          ex.id,
          ex.cycleExercise,
          controller
        );
        commit("push", ex);
      }
    },
    async get({ state, commit }, cycleId) {
      if (cycleId === state.cycleID) return state.exercises;
      const result = await CycleExercisesApi.get(cycleId);
      for (let ex of result.content) {
        commit("push", ex);
      }
      return result.content;
    },
  },
};
