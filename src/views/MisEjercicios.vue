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
    <v-row justify="center" align="end">
      <v-col cols="8">
        <v-pagination
          v-model="pagination"
          :length="getMaxPage"
          @input="updateExercises"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Exercise from "../components/Exercise";
import CreateExercise from "../components/CreateExercise";
import {mapActions, mapGetters, mapState} from "vuex";

const DEFAULT_EXERCISES_SIZE = 12;
export default {
  name: "MisEjercicios",
  components: {
    Exercise,
    CreateExercise,
  },
  data() {
    return {
      pagination: 1,
      newExercise: false,
    };
  },
  methods: {
    ...mapActions("exercise", {
      $deleteExcersice: "deleteExercise",
      $getExercisesPage: "getExercises",
    }),

    deleteButton(id) {
      //preguntar si esta seguro
      this.deleteExercise(id);
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
