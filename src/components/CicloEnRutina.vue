<template>
  <div>
    <template>
      <v-row class="mt-2" v-for="ej in agregados" :key="ej.idx">
        <v-col cols="12" sm="6">
          <v-text-field
            label="Ejercicio"
            outlined
            append-icon="expand_more"
            v-model="ej.ejercicio"
            readonly
            :rules="[rules.required]"
            @click="
              chooseExercise = true;
              exerciseIdx = ej.idx;
            "
          />
          <ChooseExercise
            v-model="chooseExercise"
            @ejercicio="setExercise"
          ></ChooseExercise>
        </v-col>
        <v-col cols="5" sm="2" offset-sm="1">
          <NumberField
            v-model="ej.cycleExercise.repetitions"
            label="Series"
            :min="1"
            :rules="[rules.required, rules.isNumber]"
          />
        </v-col>
        <v-col cols="5" sm="2">
          <NumberField
            v-model="ej.cycleExercise.duration"
            label="Tiempo"
            hint="Tiempo en segundos"
            :min="0"
            :rules="[rules.isNumber]"
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
    <SnackBar v-model="error" error> {{ errorText }} </SnackBar>
  </div>
</template>

<script>
import ChooseExercise from "./ChooseExercise";
import SnackBar from "./SnackBar";
import rules from "../jsmodules/rules";
import NumberField from "./NumberField";
import { mapActions } from "vuex";
export default {
  name: "CicloEnRutina",
  components: { NumberField, SnackBar, ChooseExercise },
  data: () => ({
    agregados: [],
    chooseExercise: false,
    exerciseIdx: null,
    idx: 0,
    error: false,
    errorText: "",
    rules: rules.rules,
  }),
  props: {
    type: {
      type: String,
      required: true,
    },
    guardado: Boolean,
    id: Number,
    apiCycleId: Number,
  },
  computed: {
    guardar() {
      return this.guardado;
    },
  },
  methods: {
    ...mapActions("cycleExercises", {
      $getEx: "get",
    }),
    agregaEjercicio() {
      if (this.agregados.length < 10) {
        const lastEx = this.agregados.at(this.agregados.length - 1);
        this.agregados.push({
          idx: this.idx++,
          id: null,
          ejercicio: null,
          cycleExercise: {
            order: lastEx.cycleExercise.order + 1,
            duration: 0,
            repetitions: 1,
          },
        });
      } else {
        this.errorText = "El máximo de ejercicios por ciclo es 10";
        this.error = true;
      }
    },
    removeEj(ej) {
      if (this.agregados.length > 1) {
        let aux = this.agregados.indexOf(ej);
        let oldOrder = this.agregados[aux].cycleExercise.order;
        if (aux > -1) this.agregados.splice(aux, 1);
        for (const ej in this.agregados) {
          if (this.agregados[ej].cycleExercise.order > oldOrder) {
            this.agregados[ej].cycleExercise.order--;
          }
        }
      }
    },
    setExercise(exercise) {
      const index = this.agregados.findIndex(
        (item) => item.idx === this.exerciseIdx
      );
      if (index === -1) return;
      this.agregados[index].ejercicio = exercise.name;
      this.agregados[index].id = exercise.id;
    },
  },
  watch: {
    guardar() {
      this.$emit("guardar", this.agregados, this.id);
    },
  },
  async beforeMount() {
    if (this.apiCycleId == null) {
      this.agregados.push({
        idx: this.idx++,
        id: null,
        ejercicio: null,
        cycleExercise: {
          order: 1,
          duration: 0,
          repetitions: 1,
        },
      });
    } else {
      const result = await this.$getEx(this.apiCycleId);
      for (let ex of result) {
        this.agregados.push({
          idx: this.idx++,
          id: ex.exercise.id,
          ejercicio: ex.exercise.name,
          cycleExercise: {
            order: ex.order,
            duration: ex.duration,
            repetitions: ex.repetitions,
          },
        });
      }
    }
  },
};
</script>
