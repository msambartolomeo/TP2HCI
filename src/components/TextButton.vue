<template>
  <v-btn
    :color="color"
    v-show="show"
    @click="$emit('click')"
    :disabled="disabled"
    text
    :block="block"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "TextButton",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    show: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
