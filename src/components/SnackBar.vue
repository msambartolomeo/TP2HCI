<template>
  <v-snackbar v-model="selected" timeout="2500">
    <slot></slot>
    <template v-slot:action="{ attrs }">
      <TextButton
        :color="error ? 'error' : 'primary'"
        text
        v-bind="attrs"
        @click="$emit('input', $event)"
      >
        Cerrar
      </TextButton>
    </template>
  </v-snackbar>
</template>

<script>
import TextButton from "./TextButton";
export default {
  name: "SnackBar",
  components: { TextButton },
  props: {
    value: Boolean,
    error: {
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
