<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h2 class="ml-2 hidden-sm-and-down">WorkIn</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/"> Inicio </v-btn>
      <v-btn text to="/rutinas" class="ml-2"> Mis Rutinas </v-btn>
      <v-btn text to="/ejercicios" class="ml-2"> Mis Ejercicios </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/perfil" class="mr-2">
        <span v-show="$isLoggedIn" class="hidden-sm-and-down mr-2">
          {{ firstName + " " + lastName }}
        </span>
        <v-icon large>account_circle</v-icon>
      </v-btn>
      <v-btn v-show="$isLoggedIn" text @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {
    ...mapGetters("user", {
      $isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    ...mapActions("user", {
      $logout: "logout",
      $getCurrentUser: "getCurrentUser",
    }),
    async logout() {
      await this.$logout();
      await this.$router.push("/login");
    },
  },
  watch: {
    "$route.params.search": {
      handler: async function () {
        if (this.$isLoggedIn) {
          let user = await this.$getCurrentUser();
          if (user) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
          }
        } else {
          this.firstName = "";
          this.lastName = "";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
