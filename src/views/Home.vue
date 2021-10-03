<template>
  <v-container fluid>
    <v-row justify="center" >
      <v-col cols="5">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <v-btn block color="primary"  >Ordenar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="aux in Routines" :key="aux" md="3" xl="2">
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
