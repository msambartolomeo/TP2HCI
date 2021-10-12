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
      <v-col v-for="exercise in exercises" :key="exercise.id" md="3" xl="2">
        <Exercise
          :id="exercise.id"
          :title="exercise.name"
          :description="exercise.detail"
          :type="exercise.type"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Exercise from "@/components/Exercise";
import NuevoEjercicio from "@/components/NuevoEjercicio";
import { mapActions } from "vuex";
import exercises from "../store/modules/exercise";

export default {
  name: "MisEjercicios",

  components: {
    Exercise,
    NuevoEjercicio,
  },

  data: () => ({
    exercises,
  }),

  methods: {
    ...mapActions("exercise", ["getExercises"]),

    updateExercises() {
      this.getExercises();
      this.exercises = this.$store.state["exercise/exercises"];
    },
  },

  beforeUpdate() {
    this.updateExercises();
  },


};
</script>
