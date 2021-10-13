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
      v-model="difficulty"
      @input="notifyRating"
    />
    <v-input hidden />
  </div>
</template>

<script>
export default {
  name: "RatingDificultad",
  props: {
    difficulty: Number,
    readonly: Boolean,
    size: Number,
  },
  methods: {
    notifyRating() {
      this.$emit("notifyRating", this.difficulty);
    },
  },
};
</script>
