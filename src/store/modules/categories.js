import { CategoryApi } from "../../../api/categories";

export default {
  namespaced: true,
  state: {
    categories: [],
    categoriesName: [],
  },
  getters: {
    findIdByName(state) {
      return (name) => {
        return state.categories[
          state.categories.findIndex((item) => item.name === name)
        ].id;
      };
    },
  },
  mutations: {
    setCategories(state, result) {
      state.categories = result.content;
      for (const category of result.content)
        state.categoriesName.push(category.name);
    },
  },
  actions: {
    async getCategories({ commit }, controller) {
      const result = await CategoryApi.getAll(controller);
      commit("setCategories", result);
      return this.categories;
    },
  },
};
