<template>
  <v-text-field
    @input="$emit('input', $event)"
    :label="label"
    outlined
    v-model="selected"
    :rules="rules"
    :disabled="disabled"
    :hint="hint"
  />
</template>

<script>
export default {
  name: "InputField",
  props: {
    hint: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    value: String,
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
        this.$emit("input", value);
      },
    },
  },
};
</script>
