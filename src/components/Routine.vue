<template>
  <v-card elevation="2" max-width="250" min-width="230">
    <v-card-title>{{ routine.name }}</v-card-title>
    <v-img :src="require('../assets/routine picture.jpg')" />
    <v-card-text>
      <v-row>
        <v-col align="center">
          <RatingScore readonly v-model="routine.score" :size="20" />
        </v-col>
        <v-col align="center">
          <RatingDificultad readonly v-model="routine.difficulty" :size="20" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="teal accent-4"
        text
        :to="{
          name: this.owner ? 'DetallesMisRutinas' : 'DetallesRutinas',
          params: { routine: routine, slug: routine.name },
        }"
      >
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RatingScore from "@/components/RatingScore";
import RatingDificultad from "@/components/RatingDificultad";
export default {
  name: "Routine",
  components: { RatingDificultad, RatingScore },
  props: {
    routine: Object,
    owner: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
