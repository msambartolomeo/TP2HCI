<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm="8" cols="12" md="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <NuevoEjercicio />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="exercise in exercises" :key="exercise.title" md="3" xl="2">
        <Exercise :title="exercise.title" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Exercise from "@/components/Exercise";
import NuevoEjercicio from "@/components/NuevoEjercicio";

export default {
  name: "MisEjercicios",
  components: {
    Exercise,
    NuevoEjercicio,
  },
  data: () => ({
    exercises: [
      { title: "Ejercicio A" },
      { title: "Ejercicio B" },
      { title: "Ejercicio C" },
      { title: "Ejercicio D" },
      { title: "Ejercicio E" },
      { title: "Ejercicio F" },
      { title: "Ejercicio G" },
      { title: "Ejercicio H" },
      { title: "Ejercicio I" },
      { title: "Ejercicio J" },
    ],
  }),
};
</script>
