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
          <Exercise :exercise="exercise" @click="openDrawer" />
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer
      v-model="drawerState"
      absolute
      temporary
      width="400"
      right
    >
      <router-view
        :key="$route.path"
        @closeClick="closeDrawer"
        @DeleteClick="deleteButton"
        @ModifyClick="modifyExercise"
      >
      </router-view>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Exercise from "@/components/Exercise";
import NuevoEjercicio from "@/components/NuevoEjercicio";
import { mapActions, mapState } from "vuex";

export default {
  name: "MisEjercicios",

  components: {
    Exercise,
    NuevoEjercicio,
  },

  data: () => ({
    drawerState: false,
    borrar: 0,
  }),

  methods: {
    ...mapActions("exercise", ["getExercises", "deleteExercise"]),

    openDrawer() {
      this.drawerState = true;
    },

    closeDrawer() {
      this.drawerState = false;
      this.$router.push("/ejercicios");
    },

    deleteButton(id) {
      //preguntar si esta seguro
      this.deleteExercise(id);
      this.closeDrawer();
    },

    modifyExercise(id) {
      this.borrar = id;
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
