<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <v-btn block color="primary">Crear rutina</v-btn>
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <v-btn block color="red">Favoritos</v-btn>
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <v-btn block color="yellow">Buscar rutinas</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="aux in Routines"
        :key="aux"
        xs="4"
        sm="4"
        md="4"
        lg="4"
        xl="4"
      >
        <Routine :title="aux.tile" :difficulty="aux.diffi" :score="aux.score" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "@/components/Routine";

export default {
  name: "MisRutinas",
  components: {
    Routine,
  },
  data: () => ({
    Routines: [
      { tile: "Rutina A", diffi: "1", score: "3" },
      { tile: "Rutina B", diffi: "1", score: "3" },
      { tile: "Rutina C", diffi: "3", score: "3" },
    ],
  }),
};
</script>
