<template>
  <v-text-field
    v-model="selected"
    @input="$emit('input', $event)"
    :append-icon="showPass ? 'visibility' : 'visibility_off'"
    :type="showPass ? 'text' : 'password'"
    :label="label"
    :hint="hint"
    counter
    @click:append="showPass = !showPass"
    outlined
    :rules="rules"
    required
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "PasswordField",
  data() {
    return {
      showPass: false,
    };
  },
  props: {
    value: String,
    rules: Array,
    label: {
      type: String,
      default: "Contraseña",
    },
    hint: {
      type: String,
      default: "",
    },
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
