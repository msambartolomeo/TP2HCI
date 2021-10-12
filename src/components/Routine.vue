<template>
  <v-card elevation="2" max-width="250" min-width="230">
    <v-card-title>{{ title }} </v-card-title>
    <v-img :src="require('../assets/routine picture.jpg')" />

    <v-card-text>
      <v-row>
        <v-col align="center">
          <v-rating
            color="yellow darken-2"
            background-color="grey"
            empty-icon="star_border"
            full-icon="star"
            half-icon="star_half"
            half-increments
            dense
            length="5"
            readonly
            size="20"
            :value="score"
          ></v-rating>
        </v-col>
        <v-col align="center">
          <v-rating
            color="red"
            background-color="grey"
            empty-icon="mdi-fire"
            full-icon="mdi-fire"
            length="3"
            readonly
            dense
            size="20"
            :value="difficulty"
          ></v-rating>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal accent-4" text @click="$emit('click')">
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Routine",
  props: {
    title: String,
    score: Number,
    difficulty: Number,
    img: String,
  },
};
</script>
