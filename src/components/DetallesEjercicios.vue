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
          @click="$emit('closeClick')"
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
          <v-btn
            block
            color="primary"
            text
            elevation="1"
            @click="handleModify"
          >
            Editar</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            block
            color="error"
            text
            elevation="1"
            @click="handleDelete"
          >
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
import { mapActions } from "vuex";
import { Exercise } from "../../api/exercise";

export default {
  name: "DetallesEjercicios",

  props: {
    id: Number,
  },

  data: () => ({
    exercise: undefined,
  }),

  methods: {
    ...mapActions("exercise", ["get"]),

    handleDelete() {
      this.$emit("DeleteClick", this.id);
    },

    handleModify() {
      this.$emit("ModifyClick", this.id);
    },

    upData() {
      this.exercise = this.get(new Exercise(this.id, null, null, null));
    },
  },

  beforeMount() {
    this.upData();
  },
};
</script>

<style scoped></style>
