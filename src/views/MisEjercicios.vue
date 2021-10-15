<template>
  <div>
    <v-container fluid class="container">
      <v-row justify="center">
        <v-col sm="8" cols="12" md="6">
          <v-text-field solo label="Buscar" prepend-inner-icon="search" />
        </v-col>
        <v-col sm="4" md="2" cols="12" class="pt-md-4">
          <v-btn block color="secondary" @click="newExercise = true">
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
    <v-footer>
      <v-col class="text-center" cols="12">
        <v-pagination
          color="secondary"
          v-model="pagination"
          :length="getMaxPage"
          @input="updateExercises"
        ></v-pagination>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Exercise from "../components/Exercise";
import CreateExercise from "../components/CreateExercise";
import { mapActions, mapGetters, mapState } from "vuex";
import SnackBar from "../components/SnackBar";

const DEFAULT_EXERCISES_SIZE = 12;
export default {
  name: "MisEjercicios",
  components: {
    Exercise,
    CreateExercise,
    SnackBar,
  },
  data() {
    return {
      pagination: 1,
      newExercise: false,
      snackbar: false,
      error: false,
      successMessage: null,
    };
  },
  methods: {
    ...mapActions("exercise", {
      $deleteExcercise: "deleteExercise",
      $getExercisesPage: "getExercises",
    }),

    snackbarHandle(data) {
      this.successMessage = "¡El ejercicio se ha guardado con exito!";
      this.error = data;
      this.snackbar = true;
    },

    async deleteButton(id) {
      this.successMessage = "¡El ejercicio se ha eliminado con exito!";
      try {
        await this.$deleteExcercise(id);
        this.error = false;
      } catch (e) {
        this.error = true;
      } finally {
        this.snackbar = true;
      }
    },
    async updateExercises() {
      await this.$getExercisesPage({
        page: this.pagination - 1,
        size: DEFAULT_EXERCISES_SIZE,
      });
    },
  },
  computed: {
    ...mapState("exercise", {
      exercises: (state) => state.exercises,
    }),
    ...mapGetters("exercise", {
      getMaxPage: "getMaxPage",
    }),
  },
  async beforeMount() {
    await this.$getExercisesPage({ page: 0, size: DEFAULT_EXERCISES_SIZE });
  },
};
</script>

<style scoped>
.container {
  min-height: 80vh;
}
</style>
