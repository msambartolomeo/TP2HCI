<template>
  <div>
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
            @click="openDrawer"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" absolute temporary width="400" right>
      <DetallesEjercicios
        :id="idCurrentExercise"
        @click="drawer = false"
        @DeleteClick="deleteExercise"
        @ModifyClick="modifyExercise"
      />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Exercise from "@/components/Exercise";
import NuevoEjercicio from "@/components/NuevoEjercicio";
import DetallesEjercicios from "../components/DetallesEjercicios";
import { mapActions, mapState } from "vuex";

export default {
  name: "MisEjercicios",

  components: {
    Exercise,
    NuevoEjercicio,
    DetallesEjercicios,
  },

  data: () => ({
    drawer: false,
    eliminar: true,
    editar: true,
    idCurrentExercise: 0,
  }),

  methods: {
    ...mapActions("exercise", ["getExercises", ""]),

    openDrawer(id) {
      this.idCurrentExercise = id;
      this.drawer = true;
    },

    deleteExercise(id) {
      this.idCurrentExercise = id;
      alert(`borrar`);

    },

    modifyExercise(id) {
      this.idCurrentExercise = id;
      alert(`modificar`);
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
