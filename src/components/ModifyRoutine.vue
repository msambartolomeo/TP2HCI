<template>
  <v-dialog
    fullscreen
    v-model="dialog"
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn dark icon @click="confirmedExit = true">
          <v-icon>close</v-icon>
        </v-btn>
        <ConfirmedExit
          title="¿Está seguro que quiere salir?"
          text="Si continua perderá la información agregada de la rutina."
          v-model="confirmedExit"
          @confirm="$emit('input', false)"
        />
        <v-toolbar-title>
          {{ id ? "Modificar Rutina" : "Crear Nueva Rutina" }}
        </v-toolbar-title>
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
                    :items="categoriesName"
                    label="Categoría"
                    outlined
                    append-icon="expand_more"
                    v-model="categoriaNombre"
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
                  <RatingDificultad :size="40" v-model="dificultad" />
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
              <v-col cols="8">
                <v-card elevation="10">
                  <v-img
                    alt="routine_logo"
                    :lazy-src="require('../assets/routine picture.jpg')"
                    :src="
                      imgError
                        ? require('../assets/routine picture.jpg')
                        : routineUrl
                    "
                    @error="imgError = true"
                    contain
                    height="350"
                    width="350"
                    class="mx-auto"
                  />
                </v-card>
              </v-col>
              <v-col cols="8">
                <InputField
                  label="Link para foto de rutina"
                  v-model="routineUrl"
                  hint="Puede utilizar una pagina como igmur para subir sus fotos"
                  @input="imgError = false"
                />
              </v-col>
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
                <TextButton class="ml-5" @click="newDialog = true">
                  <v-icon>add</v-icon>
                  Agregar Ciclo
                </TextButton>
                <NewCycle v-model="newDialog" @confirm="addCycle"></NewCycle>
              </v-card-title>
            </v-col>
            <v-col cols="12" md="3">
              <template v-for="(cycle, index) in cycles">
                <v-timeline dense :key="index">
                  <v-timeline-item>
                    <TextButton @click="selected = index + 1">
                      {{ cycle.name }}
                    </TextButton>
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
import rules from "../jsmodules/rules";
import CicloEnRutina from "./CicloEnRutina";
import { Routine, RoutineCycle } from "../../api/routines";
import { mapActions, mapGetters, mapState } from "vuex";
import NewCycle from "./NewCycle";
import ConfirmedExit from "./ConfirmedExit";
import InputField from "./user/InputField";
import TextButton from "./TextButton";
import { Category } from "../../api/categories";

export default {
  name: "ModifyRoutine",
  components: {
    TextButton,
    InputField,
    ConfirmedExit,
    NewCycle,
    CicloEnRutina,
    RatingDificultad,
  },
  props: {
    value: Boolean,
    id: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    newDialog: false,
    nombre: null,
    descripcion: null,
    dificultad: null,
    valid: true,
    rules: rules.rules,
    categoriaNombre: null,
    isPublic: false,
    cycles: [],
    selected: 1,
    confirmedExit: false,
    imgError: false,
    routineUrl: null,
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    ...mapState("categories", {
      categories: (state) => state.categories,
      categoriesName: (state) => state.categoriesName,
    }),
    ...mapGetters("categories", {
      $findIdByName: "findIdByName",
    }),
  },
  methods: {
    ...mapActions("routines", {
      $createRoutine: "create",
      $modifyRoutine: "modify",
      $get: "get",
      $getRoutines: "getRoutines",
    }),
    verifyData() {
      if (this.$refs.form.validate()) {
        this.createRoutine();
      }
    },
    async createRoutine() {
      const routine = new Routine(
        this.nombre,
        this.descripcion,
        this.isPublic,
        this.dificultad,
        new Category(this.$findIdByName(this.categoriaNombre))
      );
      try {
        await this.$createRoutine(routine);
      } catch (e) {
        //
      }
      this.dialog = false;
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
    if (this.id == null) {
      const start = new RoutineCycle("Entrada en calor", "warmup", 1, 2);
      const end = new RoutineCycle("Enfriamiento", "cooldown", 2, 2);
      this.cycles.push(start);
      this.cycles.push(end);
    } else {
      // store get input id routine etc y guardarlo en cycles
    }
  },
};
</script>
