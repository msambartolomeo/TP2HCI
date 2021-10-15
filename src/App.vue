<template>
  <v-app>
    <div v-if="this.flag">
      <AppBar />
      <v-main>
        <router-view />
        <h1 v-show="error">
          No nos podemos conectar con el servidor, intentelo mas tarde
        </h1>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBar from "./components/AppBar";
export default {
  name: "App",
  components: { AppBar },
  data() {
    return {
      flag: false,
      error: false,
    };
  },
  computed: mapGetters("user", {
    $isLoggedIn: "isLoggedIn",
  }),
  methods: {
    ...mapActions("user", {
      $getCurrentUser: "getCurrentUser",
    }),
    ...mapActions("categories", {
      $getCategories: "getCategories",
    }),
  },

  async beforeMount() {
    if (this.$isLoggedIn) {
      try {
        await this.$getCurrentUser();
      } catch (e) {
        if (e.code === 0 && e.code === 5) {
          this.error = true;
        }
      }
    }
    try {
      await this.$getCategories();
      this.flag = true;
    } catch (e) {
      if (e.code === 0 && e.code === 5) {
        this.error = true;
      }
    }
  },
};
</script>
