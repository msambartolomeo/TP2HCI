<template>
  <v-container>
    <v-row>
      <v-col
        v-for="aux in Routines"
        :key="aux"
        xs="4"
        sm="4"
        md="4"
        lg="4"
        xl="4"
      >
        <Routine :title="aux.tile" :difficulty="aux.diffi" :score="aux.score" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "@/components/Routine";

export default {
  name: "MisRutinas",
  components: {
    Routine,
  },
  data: () => ({
    Routines: [
      { tile: "Rutina A", diffi: "1", score: "3" },
      { tile: "Rutina B", diffi: "1", score: "3" },
      { tile: "Rutina C", diffi: "3", score: "3" },
      { tile: "Rutina D", diffi: "2", score: "3" },
      { tile: "Rutina E", diffi: "2", score: "2" },
      { tile: "Rutina F", diffi: "1", score: "5" },
      { tile: "Rutina G", diffi: "1", score: "2" },
      { tile: "Rutina H", diffi: "2", score: "1" },
      { tile: "Rutina I", diffi: "1", score: "4" },
      { tile: "Rutina J", diffi: "2", score: "3" },
    ],
  }),
};
</script>
