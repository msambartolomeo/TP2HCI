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
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ExerciseToChose from "./ExerciseToChose";

export default {
  name: "ChooseExercise",
  components: { ExerciseToChose },
  props: {
    value: Boolean,
  },
  data() {
    return {
      newExercise: false,
    };
  },
  methods: {
    ...mapActions("exercise", ["getExercises"]),
    chosen(exercise) {
      this.$emit("ejercicio", exercise);
      this.dialog = false;
    },
  },
  computed: {
    ...mapState("exercise", {
      exercises: (state) => state.exercises,
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
    await this.getExercises();
  },
};
</script>
