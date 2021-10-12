import { ExerciseApi } from "../../../api/exercise";

export default {
  namespaced: true,
  state: {
    exercises: undefined,
  },

  getters: {
    // findIndex(state) {
    //   return (exercise) => {
    //     return state.exercises.findIndex((item) => (item.id = exercise.id));
    //   };
    // },
  },

  mutations: {
    push(state, routine) {
      state.exercises.push(routine);
    },
    replace(state, index, routine) {
      state.exercises[index] = routine;
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

    async get({ state, getters, commit }, exercise) {
      const index = getters.findIndex(exercise);
      if (index >= 0) return state.exercises[index];
      const result = await ExerciseApi.getExercise();
      commit("push", result);
      return result;
    },

    async getExercises({ commit }, controller) {
      const result = await ExerciseApi.getExercises(controller);
      commit("replaceAll", result);
      return result;
    },
  },
};
