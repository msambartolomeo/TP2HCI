<template>
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

    <v-btn text to="/inicio"> Inicio </v-btn>
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
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "AppBar",
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {
    ...mapState("user", {
      $user: "user",
    }),
    ...mapGetters("user", {
      $isLoggedIn: "isLoggedIn",
    }),
    modified() {
      return this.$user;
    },
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
    async updateName() {
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
  },
  watch: {
    async modified() {
      await this.updateName();
    },
  },
  async beforeMount() {
    await this.updateName();
  },
};
</script>
