import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import routines from "./modules/routines";
import categories from "./modules/categories";
import exercise from "./modules/exercise";
import cycles from "./modules/cycles";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    routines,
    categories,
    exercise,
    cycles,
  },
});
