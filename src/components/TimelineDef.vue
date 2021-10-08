<template>
  <v-timeline align-top>
    <v-timeline-item v-for="ciclo in Ciclos" :key="ciclo.title">
      <v-card color="primary" dark max-width="400">
        <v-card-title class="text-h6">{{ ciclo.title }}</v-card-title>
        <v-card-text class="white text--primary">
          <p>Cantidad de Repeticiones: {{ciclo.nroReps}}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "TimelineDef",
  data: () => ({
    Ciclos: [
      { title:"Ciclo 1", nroReps:"2"},
    ]
  })
};
</script>
