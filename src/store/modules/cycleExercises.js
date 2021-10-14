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
      commit("deleteAll");
      for (let ex of state.exercises) {
        await CycleExercisesApi.delete(state.cycleID, ex.id, controller);
      }
    },
    async addAll({ state, commit, dispatch }, { exercisesArray, controller }) {
      dispatch("deleteAll");
      for (let ex of exercisesArray) {
        await CycleExercisesApi.add(
          state.cycleID,
          ex.id,
          ex.cycleExercise,
          controller
        );
        commit("push", cycle);
      }
    },
  },
};
