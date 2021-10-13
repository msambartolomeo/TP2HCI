import { ExerciseApi } from "../../../api/exercise";

export default {
  namespaced: true,
  state: {
    exercises: null,
  },

  getters: {
    findIndex(state) {
      return (exerciseId) => {
        return state.routines.findIndex((item) => (item.id = exerciseId));
      };
    },
  },

  mutations: {
    push(state, exercise) {
      state.exercises.push(exercise);
    },
    replace(state, index, exercise) {
      state.exercises[index] = exercise;
    },
    splice(state, index) {
      state.exercises.splice(index, 1);
    },
    replaceAll(state, result) {
      state.exercises = result.content;
    },
  },

  actions: {
    async create({ commit }, exercise) {
      const result = await ExerciseApi.addExercise(exercise);
      //if (!getters.findIndex(result)) commit("push", result);
      commit("push", result);
      return result;
    },

    async modify({ getters, commit }, exercise) {
      const result = await ExerciseApi.modifyExercise(exercise);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },

    async get({ state, getters, commit }, exerciseId) {
      const index = getters.findIndex(exerciseId);
      if (index !== undefined) return state.exercises[index];
      const result = await ExerciseApi.getExerciseById(exerciseId);
      commit("push", result);
      return result;
    },

    async getExercises({ commit }, controller) {
      const result = await ExerciseApi.getExercises(controller);
      commit("replaceAll", result);
      return result;
    },

    async deleteExercise({ getters, commit }, exerciseId, controller) {
      const result = await ExerciseApi.deleteExercise(exerciseId, controller);
      const index = getters.findIndex(exerciseId);
      if (index === undefined) return;
      commit("splice", index);
      return result;
    },
  },
};
