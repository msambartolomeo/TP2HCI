<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="7">
          <v-row justify="end" no-gutters>
            <v-col cols="7">
              <h1 class="centered ma-10">Mi perfil</h1>
            </v-col>
            <v-col cols="7"
              ><v-text-field label="Nombre" outlined v-model="nombre"
            /></v-col>
            <v-col cols="7"
              ><v-text-field label="Apellido" outlined v-model="apellido"
            /></v-col>
            <v-col cols="7"
              ><v-select
                :items="['M', 'F']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="genero"
            /></v-col>
            <v-col cols="7">
              <v-text-field
                label="Email"
                outlined
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fecha"
                    label="Fecha de Nacimiento"
                    prepend-inner-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fecha"
                  :active-picker.sync="activePicker"
                  show-adjacent-months
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1900-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mt-16" justify="start"
          ><v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Profile.vue",
  data: () => ({
    nombre: "Pedro",
    apellido: "Rodriguez",
    genero: "M",
    email: "prodriguez@itba.edu.ar",
    fecha: "2000-01-01",
    activePicker: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style scoped></style>
