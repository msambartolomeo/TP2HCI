import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: '#37474f',
        error: '#FF5252',
        accent: '#ffeb3b',
      },
    },
  },
  //"#cddc39",
});
