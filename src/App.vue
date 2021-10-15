<template>
  <v-app>
    <h1 v-if="this.error">
      Lo sentimos, no se ha podido establecer conexión con el servidor, por
      favor intentelo mas tarde
    </h1>
    <div v-if="this.flag">
      <AppBar />
      <v-main class="home">
        <router-view />
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
        this.error = true;
      }
    }
    try {
      await this.$getCategories();
      this.flag = true;
    } catch (e) {
      this.error = true;
    }
  },
};
</script>
<style scoped>
.home {
  background: url("./assets/pexels-la-miko-3616764.jpg");
  height: 100vh;
  background-size: cover;
}
</style>
