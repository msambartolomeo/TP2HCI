<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col cols="2" class="pt-4">
        <v-btn block color="primary text">Crear nueva rutina</v-btn>
      </v-col>
      <v-col cols="2" class="pt-4">
        <v-btn block color="red">Favoritos</v-btn>
      </v-col>
      <v-col cols="2" class="pt-4">
        <v-btn block color="yellow">Buscar nuevas rutinas</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="aux in Routines" :key="aux" md="4" lg="3" xl="2">
        <Routine :title="aux.tile" :difficulty="aux.diffi" :score="aux.score" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "@/components/Routine";

export default {
  name: "Inicio",
  components: {
    Routine,
  },
  data: () => ({
    Routines: [
      { tile: "Rutina A", diffi: "1", score: "3.5" },
      { tile: "Rutina B", diffi: "1", score: "3" },
      { tile: "Rutina C", diffi: "3", score: "3" },
      { tile: "Rutina D", diffi: "2", score: "3" },
      { tile: "Rutina E", diffi: "2", score: "2" },
      { tile: "Rutina F", diffi: "1", score: "5" },
      { tile: "Rutina G", diffi: "1", score: "2" },
      { tile: "Rutina H", diffi: "2", score: "1" },
      { tile: "Rutina I", diffi: "1", score: "4" },
      { tile: "Rutina J", diffi: "2", score: "3" },
    ],
  }),
};
</script>
