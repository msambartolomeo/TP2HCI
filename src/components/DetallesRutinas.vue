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
          @click="$emit('click')"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-2" dense>
        <h2>Detalle de Rutina</h2>
      </v-row>

      <v-row><v-divider></v-divider></v-row>

      <v-row justify="center" class="mb-4">
        <v-col class="mt-4" cols="5">
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

      <v-row><v-divider></v-divider></v-row>

      <v-row>
        <v-col>
          <v-btn block color="primary" text elevation="1"> Editar</v-btn>
        </v-col>
        <v-col>
          <v-btn block color="error" text elevation="1"> Eliminar </v-btn>
        </v-col>
      </v-row>

      <v-row><v-divider></v-divider></v-row>

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
import RatingScore from "./RatingScore";
import RatingDificultad from "./RatingDificultad";
export default {
  name: "DetallesRutinas",
  components: { RatingDificultad, RatingScore },
};
</script>

<style scoped></style>
