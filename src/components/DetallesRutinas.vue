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
        <v-img :src="require('../assets/routine picture.jpg')" />
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
          <v-row align="center" justify="star">
            <h5>Creador: juancito</h5>
          </v-row>
          <v-row align="center" justify="star">
            <h5>Dificultad:</h5>
            <RatingDificultad :size="25" :difficulty="2" readonly />
          </v-row>
          <v-row align="center" justify="star">
            <h5>Puntuacion:</h5>
            <RatingScore readonly :score="4" :size="15" />
          </v-row>
        </v-col>
        <v-col class="mt-4 mb-2" cols="5">
          <v-row align="center" justify="end">
            <h5>Fecha de creacion: 1/9/21</h5>
          </v-row>
          <v-row align="center" justify="end">
            <h5>Duracion estimada: 30min</h5>
          </v-row>
          <v-row align="center" justify="end">
            <h5>Equipamiento: NO</h5>
          </v-row>
        </v-col>
      </v-row>

      <div v-show="editable">
        <v-row><v-divider></v-divider></v-row>
        <v-row>
          <v-col>
            <v-btn
              block
              color="primary"
              text
              elevation="1"
              @click="DeleteClick"
            >
              Editar</v-btn
            >
          </v-col>
          <v-col>
            <v-btn block color="error" text elevation="1"> Eliminar </v-btn>
          </v-col>
        </v-row>
        <v-row><v-divider></v-divider></v-row>
      </div>

      <div v-show="!editable">
        <v-row><v-divider></v-divider></v-row>
      </div>

      <v-row justify="center">
        <v-col cols="10" class="mt-4">
          <h4>Descripcion</h4>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
            vehicula magna. Nam turpis lectus, bibendum at finibus sit amet,
            condimentum at nisi. Donec congue luctus fringilla. Duis sagittis
            massa est, faucibus
          </h5>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import RatingScore from "./RatingScore";
import RatingDificultad from "./RatingDificultad";
export default {
  name: "DetallesRutinas",
  components: { RatingDificultad, RatingScore },

  props: {
    routine: Object,
    editable: Boolean,
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
          setTimeout(() => this.$router.push("/"), 100);
        }
      },
    },
  },

  methods: {
    DeleteClick() {
      this.$emit("DeleteClick");
      this.state = false;
    },
  },

  mounted() {
    setTimeout(() => (this.state = true), 1);
  },
};
</script>

<style scoped></style>
