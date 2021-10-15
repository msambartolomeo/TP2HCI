<template>
  <div>
    <v-container fluid class="container">
      <v-row justify="center">
        <v-col sm="8" cols="12" md="6">
          <v-text-field solo label="Buscar" prepend-inner-icon="search" />
        </v-col>
        <v-col sm="4" md="2" cols="12" class="pt-md-4">
          <v-btn block color="primary" @click="newExercise = true">
            Crear Ejercicio
          </v-btn>
          <CreateExercise
            v-model="newExercise"
            v-if="newExercise"
            @snackbar="snackbarHandle"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="exercise in exercises" :key="exercise.id" md="3" xl="2">
          <Exercise :exercise="exercise" />
        </v-col>
      </v-row>
    </v-container>
    <SnackBar v-model="snackbar" :error="error">
      {{
        error ? "Se ha producido un error, intente nuevamente" : successMessage
      }}
    </SnackBar>
    <router-view
      :key="$route.path"
      @DeleteClick="deleteButton"
      @snackbar="snackbarHandle"
    />
  </div>
</template>

<script>
import Exercise from "../components/Exercise";
import CreateExercise from "../components/CreateExercise";
import SnackBar from "../components/SnackBar";
import { mapActions, mapState } from "vuex";

export default {
  name: "MisEjercicios",
  components: {
    Exercise,
    CreateExercise,
    SnackBar,
  },
  data() {
    return {
      newExercise: false,
      snackbar: false,
      error: false,
      successMessage: null,
    };
  },
  methods: {
    ...mapActions("exercise", ["getExercises", "deleteExercise"]),

    snackbarHandle(data) {
      this.successMessage = "¡El ejercicio se ha guardado con exito!";
      this.error = data;
      this.snackbar = true;
    },

    async deleteButton(id) {
      this.successMessage = "¡El ejercicio se ha eliminado con exito!";
      try {
        await this.deleteExercise(id);
        this.error = false;
      } catch (e) {
        this.error = true;
      } finally {
        this.snackbar = true;
      }
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

<style scoped>
.container {
  min-height: 80vh;
}
</style>
