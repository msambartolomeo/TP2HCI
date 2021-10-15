import { ExerciseApi } from "../../../api/exercise";

export default {
  namespaced: true,
  state: {
    exercises: [],
    totalCount: null,
    page: null,
    size: null,
  },

  getters: {
    findIndex(state) {
      return (exerciseId) => {
        return state.exercises.findIndex(
          (element) => element.id === exerciseId
        );
      };
    },
    getMaxPage(state) {
      return Math.ceil(state.totalCount / state.size);
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
    setPagination(state, { page, size, totalCount }) {
      state.page = page;
      state.size = size;
      state.totalCount = totalCount;
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

    async getExercises({ state, commit }, { page, size, controller }) {
      if (page === state.page) return state.exercises;
      const result = await ExerciseApi.getExercises(page, size, controller);
      commit("replaceAll", result);
      commit("setPagination", {
        page: page,
        size: size,
        totalCount: result.totalCount,
      });
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
