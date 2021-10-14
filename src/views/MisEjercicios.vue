<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col sm="8" cols="12" md="6">
          <v-text-field solo label="Buscar" prepend-inner-icon="search" />
        </v-col>
        <v-col sm="4" md="2" cols="12" class="pt-md-4">
          <v-btn block color="primary" @click="newExercise = true">
            Crear Ejercicio
          </v-btn>
          <CreateExercise v-model="newExercise" v-if="newExercise" />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="exercise in exercises" :key="exercise.id" md="3" xl="2">
          <Exercise :exercise="exercise" />
        </v-col>
      </v-row>
    </v-container>
    <router-view :key="$route.path" @DeleteClick="deleteButton" />
  </div>
</template>

<script>
import Exercise from "../components/Exercise";
import CreateExercise from "../components/CreateExercise";
import { mapActions, mapState } from "vuex";

export default {
  name: "MisEjercicios",
  components: {
    Exercise,
    CreateExercise,
  },
  data() {
    return {
      newExercise: false,
    };
  },
  methods: {
    ...mapActions("exercise", ["getExercises", "deleteExercise"]),

    deleteButton(id) {
      //preguntar si esta seguro
      this.deleteExercise(id);
    },
  },
  computed: {
    ...mapState("exercise", {
      exercises: (state) => state.exercises,
    }),
  },
  beforeMount() {
    this.getExercises();
  },
};
</script>
