<template>
  <div id="nav">
    <v-row >
      <v-col cols="auto">
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
      </v-col>

      <v-col class="links" cols="auto">
        <router-link to="/">Inicio</router-link>
      </v-col>
      <v-col class="links" cols="auto">
        <router-link to="/perfil/rutinas">Mis Rutinas</router-link>
      </v-col>
      <v-col class="links" cols="auto">
        <router-link to="/perfil/ejercicios">Mis Ejercicios</router-link>
      </v-col>

      <v-col align-self="center" cols="auto">
        <router-link to="/perfil">
          <v-btn text>
            <span class="mr-2 hidden-sm-and-down">
              {{ user_name + " " + user_surname }}
            </span>
            <v-icon x-large>account_circle</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
};
</script>

<style scoped>
#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.links {
  align-self: center;
}

.links:hover {
  text-decoration: underline;
}
</style>
