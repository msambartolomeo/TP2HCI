<template>
  <div>
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
          @click="drawerClose()"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-2" dense>
        <h2>Detalle del Ejercicio</h2>
      </v-row>
      <v-row><v-divider></v-divider></v-row>
      <v-row justify="center" class="mb-4">
        <v-col cols="5" class="mt-4">
          <v-row align="center" justify="star">
            <div>Creador: juancito</div>
          </v-row>
          <v-row align="center">
            <div>Dificultad:</div>
            <v-rating
              color="red"
              background-color="grey"
              empty-icon="mdi-fire"
              full-icon="mdi-fire"
              length="3"
              readonly
              dense
              size="18"
              value="2"
            ></v-rating>
          </v-row>
          <v-row>
            <div>Puntuacion:</div>
            <v-rating
              color="yellow darken-2"
              background-color="grey"
              empty-icon="star_border"
              full-icon="star"
              half-icon="star_half"
              half-increments
              dense
              length="5"
              readonly
              size="18"
              value="4"
            ></v-rating>
          </v-row>
        </v-col>
        <v-col cols="5" align-self="end">
          <v-row justify="end">
            <div>Fecha de creacion: 1/9/21</div>
          </v-row>
          <v-row justify="end">
            <div>Duracion estimada: 30min</div>
          </v-row>
          <v-row justify="end">
            <div>Equipamiento: NO</div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="m-4"><v-divider></v-divider></v-row>
      <v-row justify="center">
        <v-col cols="10">
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
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DetallesRutinas",

  methods: {
    ...mapActions("RoutineDrawer", ["drawerClose"]),
  },
};
</script>

<style scoped></style>
