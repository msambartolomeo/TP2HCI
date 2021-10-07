<template>
  <v-rating
    color="yellow darken-2"
    background-color="grey"
    empty-icon="star_border"
    full-icon="star"
    half-icon="star_half"
    half-increments
    dense
    hover
    :readonly="readonly"
    length="5"
    :size="size"
    :value="score"
  ></v-rating>
</template>

<script>
export default {
  name: "RatingScore",
  props: {
    score: {
      type: Number,
      default: 0,
    },
    readonly: Boolean,
    size: Number,
  },
};
</script>
