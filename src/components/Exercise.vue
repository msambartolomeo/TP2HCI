<template>
  <v-card elevation="2" class="exercise">
    <v-card-title>{{ exercise.name }} </v-card-title>
    <v-card-text>
      <v-img
        alt="exercice_logo"
        lazy-src="../assets/exercise picture.jpg"
        :src="
          imgError ? '../assets/exercise picture.jpg' : exercise.metadata.imgUrl
        "
        @error="imgError = true"
        contain
        height="150"
        width="200"
        class="mx-auto"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="teal accent-4"
        text
        :to="{
          name: 'DetallesEjercicios',
          params: { exercise: exercise, slug: exercise.name },
        }"
      >
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Exercise",
  props: {
    exercise: Object,
  },
  data() {
    return {
      imgError: false,
    };
  },
};
</script>

<style scoped>
.exercise {
  max-width: 250px;
  min-width: 230px;
  max-height: 300px;
}
</style>
