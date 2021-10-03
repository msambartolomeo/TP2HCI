<template>
  <v-card elevation="2" class="exercise">
    <v-card-title>{{ title }} </v-card-title>
    <v-card-text>
      <v-img :src="require('../assets/exercise picture.jpg')" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal accent-4" text> Detalles </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Exercise",
  props: {
    title: String,
    description: String,
    img: String,
  },
};
</script>

<style scoped>
.exercise {
  max-width: 250px;
  min-width: 230px;
}
</style>
