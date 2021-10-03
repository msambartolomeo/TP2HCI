<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <NuevoEjercicio />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="aux in Exercises" :key="aux" md="3" xl="2">
        <Exercise :title="aux.tile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Exercise from "@/components/Exercise";
import NuevoEjercicio from "@/components/NuevoEjercicio";

export default {
  name: "Mis Ejercicios",
  components: {
    Exercise,
    NuevoEjercicio,
  },
  data: () => ({
    Exercises: [
      { tile: "Ejercicio A" },
      { tile: "Ejercicio B" },
      { tile: "Ejercicio C" },
      { tile: "Ejercicio D" },
      { tile: "Ejercicio E" },
      { tile: "Ejercicio F" },
      { tile: "Ejercicio G" },
      { tile: "Ejercicio H" },
      { tile: "Ejercicio I" },
      { tile: "Ejercicio J" },
    ],
  }),
};
</script>
