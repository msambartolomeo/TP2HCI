<template>
  <v-app>
    <div v-if="this.flag">
      <AppBar />
      <v-main>
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
    };
  },
  computed: mapGetters("user", {
    $isLoggedIn: "isLoggedIn",
  }),
  methods: mapActions("user", {
    $getCurrentUser: "getCurrentUser",
  }),
  async beforeMount() {
    if (this.$isLoggedIn) {
      await this.$getCurrentUser();
    }
    this.flag = true;
  },
};
</script>
