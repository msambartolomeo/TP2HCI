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

        <h2 class="hidden-sm-and-down">WorkIn</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/">
        <span class="mr-2 ml-2">Inicio</span>
      </v-btn>
      <v-btn text to="/rutinas">
        <span class="mr-2 ml-2">Mis rutinas</span>
      </v-btn>
      <v-btn text to="/ejercicios">
        <span class="mr-2 ml-2">Mis ejercicios</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/perfil">
        <span class="mr-2 hidden-sm-and-down">
          {{ user_name + " " + user_surname }}
        </span>
        <v-icon x-large>account_circle</v-icon>
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
};
</script>
