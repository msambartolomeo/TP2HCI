<template>
  <div>
    <template v-for="(ej, index) in agregados">
      <v-row class="mt-2" :key="index">
        <v-col cols="12" sm="6">
          <v-text-field
            label="Ejercicio"
            outlined
            append-icon="expand_more"
            v-model="ej.ejercicio"
            readonly
            @click="
              chooseExercise = true;
              idx = ej.cycleExercise.order - 1;
            "
          />
          <ChooseExercise
            v-model="chooseExercise"
            @ejercicio="setExercise"
          ></ChooseExercise>
        </v-col>
        <v-col cols="5" sm="2" offset-sm="1">
          <v-text-field
            outlined
            label="Series"
            v-model="ej.cycleExercise.repetitions"
          />
        </v-col>
        <v-col cols="5" sm="2">
          <v-text-field
            outlined
            label="Tiempo"
            hint="Tiempo en segundos"
            v-model="ej.cycleExercise.duration"
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
    </template>
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
import ChooseExercise from "./ChooseExercise";
export default {
  name: "CicloEnRutina",
  components: { ChooseExercise },
  data: () => ({
    order: 1,
    agregados: [],
    chooseExercise: false,
    idx: null,
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
        id: null,
        ejercicio: null,
        cycleExercise: {
          order: this.order++,
          duration: null,
          repetitions: null,
        },
      });
    },
    removeEj(ej) {
      if (this.agregados.length > 1) {
        let aux = this.agregados.indexOf(ej);
        let oldOrder = this.agregados[aux].cycleExercise.order;
        if (aux > -1) this.agregados.splice(aux, 1);
        this.order--;
        for (const ej in this.agregados) {
          if (this.agregados[ej].cycleExercise.order > oldOrder) {
            this.agregados[ej].cycleExercise.order--;
          }
        }
      }
    },
    setExercise(exercise) {
      this.agregados[this.idx].ejercicio = exercise.name;
      this.agregados[this.idx].id = exercise.id;
    },
  },
  async beforeMount() {
    if (this.id == null) {
      this.agregados.push({
        id: null,
        ejercicio: null,
        cycleExercise: {
          order: this.order++,
          duration: null,
          repetitions: null,
        },
      });
    } else {
      // store get input id routine cycle etc y guardarlo en agregados
    }
  },
};
</script>
