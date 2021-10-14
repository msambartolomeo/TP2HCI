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
    v-model="selected"
  ></v-rating>
</template>

<script>
export default {
  name: "RatingScore",
  props: {
    value: Number,
    readonly: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
