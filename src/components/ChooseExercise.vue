<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn dark icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Elegir ejercicio</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid>
        <v-row>
          <v-col v-for="exercise in exercises" :key="exercise.id" md="3" xl="2">
            <ExerciseToChose :exercise="exercise" @click="chosen" />
          </v-col>
        </v-row>
        <v-row justify="center" align="end">
          <v-col cols="8">
            <v-pagination
              v-model="pagination"
              :length="getMaxPage"
              @input="updateExercises"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ExerciseToChose from "./ExerciseToChose";

const DEFAULT_EXERCISES_SIZE = 12;
export default {
  name: "ChooseExercise",
  components: { ExerciseToChose },
  props: {
    value: Boolean,
  },
  data() {
    return {
      pagination: 1,
    };
  },
  methods: {
    ...mapActions("exercise", {
      $getExercisesPage: "getExercises",
    }),
    chosen(exercise) {
      this.$emit("ejercicio", exercise);
      this.dialog = false;
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
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  async beforeMount() {
    await this.$getExercisesPage({ page: 0, size: DEFAULT_EXERCISES_SIZE });
  },
};
</script>
