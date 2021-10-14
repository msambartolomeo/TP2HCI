<template>
  <v-text-field
    :label="label"
    outlined
    v-model="selected"
    :rules="rules"
    :disabled="disabled"
    :hint="hint"
    type="number"
    :min="min"
  />
</template>

<script>
export default {
  name: "NumberField",
  props: {
    hint: {
      type: String,
      default: "",
    },
    min: Number,
    label: {
      type: String,
      required: true,
    },
    value: Number,
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: Array,
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", Number(value));
      },
    },
  },
};
</script>
