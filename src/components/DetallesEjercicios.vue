<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-img :src="require('../assets/exercise picture.jpg')" />
        <v-btn
          class="ma-3"
          absolute
          right
          fab
          small
          color="primary"
          @click="closeDrawer"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-2" dense>
        <h2>{{ exercise.name }}</h2>
      </v-row>
      <v-row><v-divider></v-divider></v-row>
      <v-row>
        <v-col>
          <EditExercias :exercise="exercise" @closeDrawer="closeDrawer" />
        </v-col>
        <v-col>
          <v-btn block color="error" text elevation="1" @click="DeleteClick">
            Eliminar
          </v-btn>
        </v-col>
      </v-row>
      <v-row><v-divider></v-divider></v-row>
      <v-row justify="center">
        <v-col cols="10">
          <h4>Descripcion</h4>
          <h5>{{ exercise.detail }}</h5>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EditExercias from "./EditExercias";
export default {
  name: "DetallesEjercicios",
  components: { EditExercias },

  props: {
    exercise: {
      id: Number,
      name: String,
      detail: String,
      isExercise: Boolean,
    },
  },

  methods: {
    DeleteClick() {
      this.$emit("DeleteClick", this.exercise.id);
    },

    closeDrawer() {
      this.$emit("closeClick");
    },
  },
};
</script>

<style scoped></style>
