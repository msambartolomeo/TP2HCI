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
        <span class="hidden-sm-and-down mr-2">
          {{ user_name + " " + user_surname }}
        </span>
        <v-icon large>account_circle</v-icon>
      </v-btn>
      <v-btn text @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    user_name: "Pepe",
    user_surname: "Rodriguez",
  }),
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>
