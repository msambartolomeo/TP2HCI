<template>
  <v-dialog
    fullscreen
    v-model="dialog"
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block slot="activator" v-on="on" color="primary"
        >Crear nueva rutina</v-btn
      >
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <SalidaConfirmada @reset="reset" />
        <v-toolbar-title>Crear nueva rutina</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="verifyData"> Guardar </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row>
        <v-col cols="12" md="6">
          <v-row justify="center">
            <v-col cols="10">
              <v-card-title class="text-h4 ml-1">
                Información de la rutina
              </v-card-title>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="10" md="5">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Nombre"
                    v-model="nombre"
                    :rules="[rules.required]"
                  />
                  <v-textarea
                    auto-grow
                    outlined
                    label="Descripción"
                    v-model="descripcion"
                    :rules="[rules.required]"
                  />
                  <v-select
                    :items="categorias"
                    label="Categoría"
                    outlined
                    append-icon="expand_more"
                    v-model="categoria"
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <h5 class="text-h5 ml-4 mt-6 mr-4">Dificultad</h5>
                <v-input
                  class="mt-2"
                  v-model="dificultad"
                  :rules="[rules.required]"
                >
                  <RatingDificultad
                    :readonly="false"
                    :size="40"
                    :difficulty="dificultad"
                    @notifyRating="updateRating"
                  />
                </v-input>
              </v-row>
              <v-row no-gutters>
                <h5 class="text-h5 ml-4 mt-1">Compartir rutina</h5>
                <v-switch class="mt-1 ml-4" v-model="isPublic" />
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" md="6">
            <v-row justify="center">
              <v-img
                alt="routine_img"
                :src="require('../assets/logo.svg')"
                contain
                max-width="400"
                max-height="400"
              ></v-img>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-card-title class="text-h4 ml-1">
                Ciclos y ejercicios
                <v-btn
                  color="primary"
                  class="ml-5"
                  text
                  @click="newDialog = true"
                >
                  <v-icon>add</v-icon>
                  Agregar Ciclo
                </v-btn>
                <NewCycle v-model="newDialog" @confirm="addCycle"></NewCycle>
              </v-card-title>
            </v-col>
            <v-col cols="12" md="3">
              <template v-for="(cycle, index) in cycles">
                <v-timeline dense :key="index">
                  <v-timeline-item>
                    <v-btn text color="primary" @click="selected = index + 1">
                      {{ cycle.name }}
                    </v-btn>
                  </v-timeline-item>
                </v-timeline>
              </template>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="5">
          <template v-for="(cycle, index) in cycles">
            <v-card
              v-if="selected === index + 1"
              :key="index"
              outlined
              elevation="20"
            >
              <v-card-text>
                <v-row class="mt-5">
                  <v-col cols="6">
                    <h1 class="text-h5 mt-2">
                      {{ cycle.name }}
                    </h1>
                  </v-col>
                  <v-spacer />
                  <v-col cols="6" md="4" align-self="center">
                    <v-text-field
                      v-model="cycle.repetitions"
                      outlined
                      label="Nro de Repeticiones"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1" class="hidden-sm-and-down"></v-col>
                </v-row>
                <v-divider />
                <CicloEnRutina
                  v-model="cycle.name"
                  :type="cycle.type"
                  @click="removeCycle(cycle)"
                />
              </v-card-text>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import RatingDificultad from "./RatingDificultad";
import SalidaConfirmada from "./SalidaConfirmada";
import rules from "../jsmodules/rules";
import CicloEnRutina from "./CicloEnRutina";
import { Routine, RoutineCycle } from "../../api/routines";
import { mapActions } from "vuex";
import NewCycle from "./NewCycle";

export default {
  name: "NuevaRutina",
  components: { NewCycle, CicloEnRutina, SalidaConfirmada, RatingDificultad },
  data: () => ({
    dialog: false,
    routine: null,
    newDialog: false,
    nombre: null,
    descripcion: null,
    dificultad: null,
    valid: true,
    rules: rules.rules,
    categoria: null,
    categorias: ["hola", "chau"],
    isPublic: false,
    cycles: [],
    selected: 1,
  }),
  methods: {
    ...mapActions("routines", {
      $createRoutine: "create",
      $modifyRoutine: "modify",
      $get: "get",
      $getRoutines: "getRoutines",
    }),
    verifyData() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.resetValidation();
      this.nombre = null;
      this.descripcion = null;
      this.categoria = null;
      this.dificultad = null;
      this.dialog = false;
    },
    updateRating(rating) {
      this.dificultad = rating;
    },
    async createRoutine() {
      const routine = new Routine(
        null,
        this.nombre,
        this.descripcion,
        false,
        this.dificultad,
        this.categoria
      );
      try {
        this.routine = await this.$createRoutine(routine);
      } catch (e) {
        //
      }
    },
    addCycle(name) {
      const lastCycle = this.cycles.at(this.cycles.length - 1);
      const cycle = new RoutineCycle(name, "exercise", lastCycle.order, 2);
      this.cycles.splice(this.cycles.length - 1, 0, cycle);
      lastCycle.order++;
    },
    removeCycle(cycle) {
      let aux = this.cycles.indexOf(cycle);
      if (aux > -1) this.cycles.splice(aux, 1);
    },
  },
  async beforeMount() {
    // if rutina no es nueva buscar desde store etc
    // else es nueva entonces cargo las cosas base
    const start = new RoutineCycle("Entrada en calor", "warmup", 1, 2);
    const end = new RoutineCycle("Enfriamiento", "cooldown", 2, 2);
    this.cycles.push(start);
    this.cycles.push(end);
  },
};
</script>
