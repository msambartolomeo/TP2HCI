<template>
  <v-card elevation="2" class="exercise">
    <v-card-title>{{ title }} </v-card-title>
    <v-card-text>
      <v-img :src="require('../assets/exercise picture.jpg')" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal accent-4" text @click="handleClick()">
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Exercise",

  props: {
    id: Number,
    title: String,
    description: String,
    type: String,
  },
  methods: {
    handleClick() {
      this.$emit("click", this.id);
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
