<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm="8" cols="12" md="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <NuevaRutina />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="routine in routines" :key="routine.title" md="3" xl="2">
        <Routine
          :title="routine.title"
          :difficulty="routine.diffi"
          :score="routine.score"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "@/components/Routine";
import NuevaRutina from "@/components/NuevaRutina";

export default {
  name: "MisRutinas",
  components: {
    NuevaRutina,
    Routine,
  },
  data: () => ({
    routines: [
      { title: "Rutina A", diffi: 1, score: 3 },
      { title: "Rutina B", diffi: 1, score: 3 },
      { title: "Rutina C", diffi: 3, score: 3 },
    ],
  }),
};
</script>
