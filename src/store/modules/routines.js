import { RoutineApi } from "../../../api/routines";
import { UserApi } from "../../../api/user";

export default {
  namespaced: true,
  state: {
    routines: [],
    totalCount: null,
    page: null,
    size: null,
  },
  getters: {
    findIndex(state) {
      return (routine) => {
        return state.routines.findIndex((item) => (item.id = routine.id));
      };
    },
    getMaxPage(state) {
      return Math.ceil(state.totalCount / state.size);
    },
    getRoutines(state) {
      return state.routines;
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
    setSize(state, size) {
      state.size = size;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalCount(state, totalCount) {
      state.totalCount = totalCount;
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
      commit("replaceAll", result.content);
      commit("setTotalCount", result.totalCount);
      return result;
    },
    async getRoutinesPage({ commit }, { page, size, controller }) {
      const result = await RoutineApi.getRoutinesPage(page, size, controller);
      commit("replaceAll", result.content);
      commit("setPage", page);
      commit("setTotalCount", result.totalCount);
      commit("setSize", size);
    },
    async getRoutinesUser({ commit }, { page, size, controller }) {
      const result = await UserApi.routines(page, size, controller);
      commit("replaceAll", result.content);
      commit("setPage", page);
      commit("setTotalCount", result.totalCount);
      commit("setSize", size);
    },
  },
};
