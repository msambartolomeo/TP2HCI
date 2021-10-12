<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="4">
        <h1 class="text-h5">Entrada en Calor</h1>
      </v-col>
      <v-spacer />
      <v-col cols="3">
        <v-text-field outlined label="Numero de Repeticiones"></v-text-field>
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="mt-2" v-for="ej in agregados" :key="ej.id">
      <v-col cols="6">
        <v-select
          :items="ejerciciosDisponibles"
          label="Ejercicio"
          outlined
          append-icon="expand_more"
          v-model="ej.ejercicio"
        />
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <v-text-field outlined label="Series" v-model="ej.series" />
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          label="Tiempo"
          suffix="segundos"
          v-model="ej.tiempo"
        />
      </v-col>
      <v-col>
        <v-btn icon color="red" class="mt-3" @click="removeEj(ej)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-btn text @click="agregaEjercicio">
        <v-icon>add</v-icon>
        Agregar Ejercicio
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CicloEnRutina",
  data: () => ({
    id: 1,
    agregados: [{ id: 1, ejercicio: null, series: null, tiempo: null }],
    ejerciciosDisponibles: ["Sentadilla","Abdominales"],
  }),
  props: {
    isMiddle: Boolean,
  },
  methods: {
    agregaEjercicio() {
      this.agregados.push({ id: this.id, ejercicio: null, series:null, tiempo:null });
      this.id++;
    },
    removeEj(ej) {
      let aux = this.agregados.indexOf(ej);
      if (aux > -1)
        this.agregados.splice(aux, 1);
    }
  }
};
</script>
