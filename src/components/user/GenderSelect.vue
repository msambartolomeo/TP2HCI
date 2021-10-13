<template>
  <v-select
    @input="$emit('input', $event)"
    :items="['Masculino', 'Femenino', 'Otro']"
    label="Género"
    outlined
    append-icon="expand_more"
    v-model="selected"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "GenderSelect",
  props: {
    value: String,
    disabled: {
      type: Boolean,
      default: false,
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
