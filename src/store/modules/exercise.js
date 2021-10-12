import { ExercisesApi } from "../../../api/exercise";

export default {
  namespaced: true,
  state: {
    exercises: [],
  },

  getters: {
    findIndex(state) {
      return (exercise) => {
        return state.exercises.findIndex((item) => (item.id = exercise.id));
      };
    },
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
    replaceAll(state, routine) {
      state.exercises = routine;
    },
  },

  actions: {
    async create({ getters, commit }, exercise) {
      const result = await ExercisesApi.add(exercise);
      if (!getters.findIndex(result)) commit("push", result);
      return result;
    },

    async modify({ getters, commit }, exercise) {
      const result = await ExercisesApi.modifyExercise(exercise);
      const index = getters.findIndex(result);
      if (index >= 0) commit("replace", index, result);
      return result;
    },

    async get({ state, getters, commit }, exercise) {
      const index = getters.findIndex(exercise);
      if (index >= 0) return state.exercises[index];
      const result = await ExercisesApi.getExercise();
      commit("push", result);
      return result;
    },

    async getRoutines({ commit }, controller) {
      const result = await ExercisesApi.getExercises(controller);
      commit("replaceAll", result);
      return result;
    },
  },
};
