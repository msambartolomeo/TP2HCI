<template>
  <div>
    <v-row class="mt-2" v-for="ej in agregados" :key="ej.id">
      <v-col cols="12" sm="6">
        <v-text-field
          label="Ejercicio"
          outlined
          append-icon="expand_more"
          v-model="ej.ejercicio"
          readonly
        />
      </v-col>
      <v-col cols="5" sm="2" offset-sm="1">
        <v-text-field outlined label="Series" v-model="ej.series" />
      </v-col>
      <v-col cols="5" sm="2">
        <v-text-field
          outlined
          label="Tiempo"
          hint="Tiempo en segundos"
          v-model="ej.tiempo"
        />
      </v-col>
      <v-col cols="1">
        <v-btn
          icon
          color="error"
          class="mt-3"
          @click="removeEj(ej)"
          v-show="agregados.length > 1"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="primary" text @click="agregaEjercicio">
        <v-icon>add</v-icon>
        Agregar Ejercicio
      </v-btn>
      <v-btn
        icon
        color="error"
        @click="$emit('click')"
        v-show="type === 'exercise'"
      >
        <v-icon>close</v-icon>
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
    ejerciciosDisponibles: ["Sentadilla", "Abdominales"],
  }),
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    agregaEjercicio() {
      this.agregados.push({
        id: this.id,
        ejercicio: null,
        series: null,
        tiempo: null,
      });
      this.id++;
    },
    removeEj(ej) {
      if (this.agregados.length > 1) {
        let aux = this.agregados.indexOf(ej);
        if (aux > -1) this.agregados.splice(aux, 1);
      }
    },
  },
};
</script>
