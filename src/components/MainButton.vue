<template>
  <v-btn
    :color="color"
    v-show="show"
    @click="$emit('click')"
    :block="block"
    :disabled="disabled"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "MainButton",
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
      default: true,
    },
  },
};
</script>
