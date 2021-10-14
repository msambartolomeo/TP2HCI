<template>
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
    v-model="selected"
    @input="switchDifficultyReversed"
  />
</template>

<script>
export default {
  name: "RatingDificultad",
  props: {
    value: String,
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
        return this.switchDifficulty(this.value);
      },
      set(value) {
        this.switchDifficultyReversed(value);
      },
    },
  },
  methods: {
    switchDifficulty(value) {
      switch (value) {
        case "rookie":
          return 1;
        case "intermediate":
          return 2;
        case "expert":
          return 3;
        default:
          this.difficulty = 0;
      }
    },
    switchDifficultyReversed(value) {
      switch (value) {
        case 1:
          this.$emit("input", "rookie");
          break;
        case 2:
          this.$emit("input", "intermediate");
          break;
        case 3:
          this.$emit("input", "expert");
          break;
        default:
          this.$emit("input", null);
      }
    },
  },
};
</script>
