<template>
  <div class="home">
    <NuevoEjercicio />
  </div>
</template>

<script>
// @ is an alias to /src
import NuevoEjercicio from "@/components/NuevoEjercicio";

export default {
  name: "Home",
  components: {
    NuevoEjercicio,
  },
};
</script>
