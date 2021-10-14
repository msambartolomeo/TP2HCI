<template>
  <v-navigation-drawer
    v-model="drawerState"
    absolute
    temporary
    width="400"
    right
  >
    <v-container fluid>
      <v-row>
        <v-img
          alt="rountine_logo"
          :src="require('../assets/routine picture.jpg')"
          contain
          height="200"
          width="200"
          class="mx-auto"
        />
        <v-btn
          class="ma-3"
          absolute
          right
          fab
          small
          color="primary"
          @click="state = false"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-row>

      <v-row justify="center" class="mt-2" dense>
        <h2>{{ routine.name }}</h2>
      </v-row>

      <v-row><v-divider></v-divider></v-row>

      <v-row justify="center" class="mb-4">
        <v-col class="mt-4 mb-2" cols="5">
          <v-row align="center" justify="start">
            <h5 class="mr-2">Dificultad:</h5>
            <RatingDificultad
              readonly
              v-model="routine.difficulty"
              :size="18"
            />
          </v-row>
          <v-row align="center" justify="start">
            <h5>{{ routine.isPublic ? "Publica" : "Privada" }}</h5>
            <v-icon small class="ml-2">
              {{ routine.isPublic ? "lock_open" : "https" }}
            </v-icon>
          </v-row>
        </v-col>
        <v-col class="mt-4 mb-2" cols="5">
          <v-row align="center" justify="start">
            <h5>Creado: {{ getDate(routine.date) }}</h5>
          </v-row>
          <v-row align="center" justify="start" v-show="routine.isPublic">
            <h5>Puntuacion:</h5>
            <RatingScore readonly v-model="routine.score" :size="15" />
          </v-row>
        </v-col>
      </v-row>

      <v-row><v-divider></v-divider></v-row>
      <v-row>
        <v-col>
          <v-btn block color="primary" elevation="1" @click="EditClick">
            Editar</v-btn
          >
        </v-col>
        <v-col>
          <v-btn block color="error" elevation="1" @click="DeleteClick">
            Eliminar
          </v-btn>
        </v-col>
      </v-row>
      <v-row><v-divider></v-divider></v-row>

      <v-row justify="center">
        <v-col cols="10" class="mt-4">
          <h4>Descripcion</h4>
          <h5>{{ routine.detail }}</h5>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import RatingScore from "./RatingScore";
import RatingDificultad from "./RatingDificultad";
export default {
  name: "DetallesMisRutinas",
  components: { RatingDificultad, RatingScore },

  props: {
    routine: Object,
  },

  data() {
    return {
      state: false,
    };
  },

  computed: {
    drawerState: {
      get() {
        return this.state;
      },
      set(value) {
        this.state = value;
        if (!value) {
          setTimeout(() => this.$router.push("/rutinas"), 100);
        }
      },
    },
  },

  methods: {
    DeleteClick() {
      this.$emit("DeleteClick", this.routine.id);
      this.state = false;
    },

    EditClick() {},

    getDate(dateUTC) {
      if (dateUTC) {
        let date = new Date(dateUTC);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
          day = `0${day}`;
        }
        if (month < 10) {
          month = `0${month}`;
        }
        return `${year}-${month}-${day}`;
      }
      return "";
    },
  },

  mounted() {
    setTimeout(() => (this.state = true), 1);
  },
};
</script>

<style scoped></style>
