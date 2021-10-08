<template>
  <div>
    <v-rating
      color="red"
      background-color="grey"
      empty-icon="mdi-fire"
      full-icon="mdi-fire"
      length="3"
      hover
      :readonly="readonly"
      dense
      :size="size"
      :value="difficulty"
    ></v-rating>
    <v-input hidden />
  </div>


</template>

<script>
export default {
  name: "RatingDificultad",
  props: {
    difficulty: {
      type: Number,
      default: 0,
    },
    readonly: Boolean,
    size: Number,
  },
};
</script>

<style scoped></style>
