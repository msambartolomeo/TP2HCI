import { ExerciseApi } from "../../../api/exercise";

export default {
  namespaced: true,
  state: {
    exercises: [],
  },

  getters: {
    findIndex(state) {
      return (exerciseId) => {
        return state.exercises.findIndex(
          (element) => element.id === exerciseId
        );
      };
    },
  },

  mutations: {
    push(state, exercise) {
      state.exercises.push(exercise);
    },
    replace(state, { index, exercise }) {
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
    async create({ commit, getters }, exercise) {
      const result = await ExerciseApi.addExercise(exercise);
      if (!getters.findIndex(result)) commit("push", result);
      commit("push", result);
      return result;
    },

    async editExercise({ getters, commit }, { exercise, id, controller }) {
      const result = await ExerciseApi.editExercise(exercise, id, controller);
      const index = getters.findIndex(result.id);
      if (index >= 0) commit("replace", { index: index, exercise: result });
      return result;
    },

    // async getExercise({ state, getters, commit }, exerciseId) {
    //   const index = getters.findIndex(exerciseId);
    //   if (index >= 0) return state.exercises[index];
    //   const result = await ExerciseApi.getExerciseById(exerciseId);
    //   commit("push", result);
    //   return result;
    // },

    async getExercises({ commit }, controller) {
      const result = await ExerciseApi.getExercises(controller);
      commit("replaceAll", result);
      return result;
    },

    async deleteExercise({ getters, commit }, exerciseId) {
      await ExerciseApi.deleteExercise(exerciseId);
      const index = getters.findIndex(exerciseId);
      if (index === undefined) return;
      commit("splice", index);
    },
  },
};
