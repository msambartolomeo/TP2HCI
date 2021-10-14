<template>
  <v-card elevation="2" class="exercise">
    <v-card-title>{{ exercise.name }} </v-card-title>
    <v-card-text>
      <v-img :src="require('../assets/exercise picture.jpg')" />
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
        @click="$emit('click')"
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
    exercise: {
      id: Number,
      name: String,
      detail: String,
    },
  },
};
</script>

<style scoped>
.exercise {
  max-width: 250px;
  min-width: 230px;
}
</style>
