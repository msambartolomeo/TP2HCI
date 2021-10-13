<template>
  <p
    @click="$emit('click')"
    class="mt-6 text-center link font-weight-bold color"
  >
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: "TextLink",
};
</script>

<style scoped>
.link {
  color: #2c3e50;
}
.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
