<template>
  <v-dialog
    fullscreen
    v-model="dialog"
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-form v-model="valid" ref="form" lazy-validation>
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
                  <TextButton class="ml-5" @click="newCycle">
                    <v-icon>add</v-icon>
                    Agregar Ciclo
                  </TextButton>
                  <NewCycle v-model="newDialog" @confirm="addCycle"></NewCycle>
                </v-card-title>
              </v-col>
              <v-col cols="12" md="3">
                <v-timeline dense v-for="cycle in cycles" :key="cycle.id">
                  <v-timeline-item>
                    <TextButton @click="selected = cycle.id + 1">
                      {{ cycle.cycle.name }}
                    </TextButton>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              v-for="cycle in cycles"
              v-show="selected === cycle.id + 1"
              :key="cycle.id"
              outlined
              elevation="20"
            >
              <v-card-text>
                <v-row class="mt-5">
                  <v-col cols="6">
                    <h1 class="text-h5 mt-2">
                      {{ cycle.cycle.name }}
                    </h1>
                  </v-col>
                  <v-spacer />
                  <v-col cols="6" md="4" align-self="center">
                    <NumberField
                      v-model="cycle.cycle.repetitions"
                      label="Nro de Repeticiones"
                      :min="2"
                      :rules="[rules.required, rules.isNumber, rules.mayora2]"
                    />
                  </v-col>
                  <v-col cols="1" class="hidden-sm-and-down"></v-col>
                </v-row>
                <v-divider />
                <CicloEnRutina
                  :type="cycle.cycle.type"
                  @click="removeCycle(cycle)"
                  :guardado="guardarExercices"
                  :id="cycle.id"
                  @guardar="getExercises"
                  :call-api="id != null"
                />
              </v-card-text>
            </v-card>
            <SnackBar v-model="error" error> {{ errorText }} </SnackBar>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import RatingDificultad from "./RatingDificultad";
import rules from "../jsmodules/rules";
import CicloEnRutina from "./CicloEnRutina";
import { Routine, RoutineCycle } from "../../api/routines";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import NewCycle from "./NewCycle";
import ConfirmedExit from "./ConfirmedExit";
import InputField from "./user/InputField";
import TextButton from "./TextButton";
import { Category } from "../../api/categories";
import SnackBar from "./SnackBar";
import NumberField from "./NumberField";

export default {
  name: "ModifyRoutine",
  components: {
    NumberField,
    SnackBar,
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
    selected: 0,
    confirmedExit: false,
    imgError: false,
    routineUrl: null,
    errorText: "",
    error: false,
    order: 1,
    guardarExercices: false,
    cycleId: 1,
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
    ...mapState("cycles", {
      cyclesState: (state) => state.cycles,
    }),
    ...mapState("categories", {
      categories: (state) => state.categories,
      categoriesName: (state) => state.categoriesName,
    }),
    ...mapGetters("categories", {
      $findIdByName: "findIdByName",
    }),
  },
  methods: {
    ...mapMutations("cycles", {
      setRoutineID: "setRoutineID",
    }),
    ...mapActions("cycleExercises", {
      $putExercises: "addAll",
    }),
    ...mapActions("cycles", {
      $getCycles: "get",
      $putCycles: "addAll",
    }),
    ...mapActions("routines", {
      $createRoutine: "create",
      $modifyRoutine: "modify",
      $getRoutine: "get",
      $getRoutines: "getRoutines",
    }),
    async verifyData() {
      if (this.$refs.form.validate()) {
        this.guardarExercices = true;
        if (this.id) {
          await this.modifyRoutine();
        } else {
          await this.createRoutine();
        }

        if (this.error) return;

        try {
          await this.$putCycles({ cycleArray: this.cycles });
          await this.cycles.forEach((cy, index) => {
            this.$putExercises({
              exercisesArray: cy.exercises,
              cycleID: this.cyclesState[index].id,
            });
          });
          this.dialog = false;
        } catch (e) {
          this.errorText = "No se ha podido agregar los ciclos";
          this.error = true;
        }
        // await this.$router.go();
      }
    },
    async createRoutine() {
      const routine = new Routine(
        this.nombre,
        this.descripcion,
        this.isPublic,
        this.dificultad,
        new Category(this.$findIdByName(this.categoriaNombre)),
        this.routineUrl
      );
      try {
        const newRoutine = await this.$createRoutine(routine);
        this.setRoutineID(newRoutine.id);
      } catch (e) {
        this.errorText = "No se ha podido crear la rutina";
        this.error = true;
      }
    },
    async modifyRoutine() {
      const routine = new Routine(
        this.nombre,
        this.descripcion,
        this.isPublic,
        this.dificultad,
        new Category(this.$findIdByName(this.categoriaNombre)),
        this.routineUrl
      );
      try {
        await this.$modifyRoutine({ routine: routine, routineId: this.id });
      } catch (e) {
        this.errorText = "No se ha podido modificar la rutina";
        this.error = true;
      }
    },
    addCycle(name) {
      const lastCycle = this.cycles.at(this.cycles.length - 1);
      const cycle = new RoutineCycle(
        name,
        "exercise",
        lastCycle.cycle.order,
        2
      );
      this.cycles.splice(this.cycles.length - 1, 0, {
        id: this.cycleId++,
        cycle: cycle,
        exercises: [],
      });
      lastCycle.cycle.order++;
    },
    newCycle() {
      if (this.cycles.length < 10) {
        this.newDialog = true;
      } else {
        this.errorText = "El máximo de ciclos es 10";
        this.error = true;
      }
    },
    removeCycle(cycle) {
      let aux = this.cycles.indexOf(cycle);
      let oldOrder = this.cycles[aux].cycle.order;
      if (aux > -1) this.cycles.splice(aux, 1);
      this.order--;
      for (const cycle in this.cycles) {
        if (this.cycles[cycle].cycle.order > oldOrder) {
          this.cycles[cycle].cycle.order--;
        }
      }
    },
    getExercises(agregados, id) {
      const idx = this.cycles.findIndex((element) => element.id === id);
      this.cycles[idx].exercises = agregados;
    },
  },
  async beforeMount() {
    if (this.id == null) {
      const start = new RoutineCycle("Entrada en calor", "warmup", 1, 2);
      const end = new RoutineCycle("Enfriamiento", "cooldown", 2, 2);
      this.cycles.push({ id: this.cycleId++, cycle: start, exercises: [] });
      this.cycles.push({ id: this.cycleId++, cycle: end, exercises: [] });
    } else {
      const routine = await this.$getRoutine(this.id);
      this.nombre = routine.name;
      this.descripcion = routine.detail;
      this.isPublic = routine.isPublic;
      this.dificultad = routine.difficulty;
      this.categoriaNombre = routine.category.name;
      this.routineUrl = routine.metadata.routineUrl;

      const cycles = await this.$getCycles(this.id);
      for (const cy of cycles) {
        this.cycles.push({
          id: this.cycleId++,
          cycle: new RoutineCycle(cy.name, cy.type, cy.order, cy.repetitions),
          exercises: [],
        });
      }
    }
  },
};
</script>
