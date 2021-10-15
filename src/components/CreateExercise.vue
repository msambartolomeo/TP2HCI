<template>
  <div>
    <v-dialog
      max-width="800px"
      v-model="dialogState"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="text-h5">
            <v-row align="center">
              <v-col>
                <div v-show="!exercise">
                  {{ `Crear Nuevo ${isRest ? "Descanso" : "Ejercicio"}` }}
                </div>
                <div v-show="exercise">Modificar</div>
              </v-col>
              <v-col>
                <v-switch
                  v-show="!exercise"
                  inset
                  v-model="isRest"
                  :label="isRest ? 'Descanso' : 'Ejercicio'"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      label="Nombre"
                      v-model="name"
                      :rules="[rules.required, rules.length100]"
                    />
                    <v-textarea
                      auto-grow
                      outlined
                      label="Descripción"
                      v-model="detail"
                      :rules="[rules.required, rules.length200]"
                    />
                    <v-text-field
                      outlined
                      label="Link para foto de perfil"
                      v-model="imgUrl"
                      hint="Puede utilizar una pagina como igmur para subir sus fotos"
                      @input="imgError = false"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-img
                    v-show="isRest"
                    alt="exercice_logo"
                    :lazy-src="require('../assets/descanso.jpg')"
                    :src="imgError ? require('../assets/descanso.jpg') : imgUrl"
                    @error="imgError = true"
                    contain
                    height="300"
                    width="300"
                    class="mx-auto"
                  />
                  <v-img
                    v-show="!isRest"
                    alt="exercice_logo"
                    :lazy-src="require('../assets/exercise picture.jpg')"
                    :src="
                      imgError
                        ? require('../assets/exercise picture.jpg')
                        : imgUrl
                    "
                    @error="imgError = true"
                    contain
                    height="300"
                    width="300"
                    class="mx-auto"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text x-large @click="saveExercise">
              Guardar
            </v-btn>
            <v-btn color="error" text x-large @click="confirmedExit = true">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <ConfirmedExit
      title="¿Está seguro que quiere salir?"
      text="Si continua perderá la información agregada de la rutina."
      v-model="confirmedExit"
      @confirm="dialogState = false"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Exercise } from "../../api/exercise";
import rules from "../jsmodules/rules";
import ConfirmedExit from "./ConfirmedExit";

export default {
  name: "CreateExercise",
  components: { ConfirmedExit },
  props: {
    exercise: Object,
    value: Boolean,
  },
  data: () => ({
    name: null,
    detail: null,
    imgUrl: null,
    type: null,
    imgError: false,
    rules: rules.rules,
    valid: true,
    confirmedExit: false,
    isRest: false,
    title: null,
  }),
  computed: {
    dialogState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions("exercise", ["create", "editExercise"]),
    async saveExercise() {
      if (this.$refs.form.validate()) {
        const exercise = new Exercise(
          this.name,
          this.detail,
          this.imgUrl,
          this.isRest
        );
        if (this.exercise) {
          try {
            exercise.metadata.isRest = this.exercise.metadata.isRest;
            await this.editExercise({
              exercise: exercise,
              id: this.exercise.id,
            });
            this.$emit("snackbar", false);
          } catch (e) {
            this.$emit("snackbar", true);
          }
        } else {
          try {
            await this.create(exercise);
            this.$emit("snackbar", false);
          } catch (e) {
            this.$emit("snackbar", true);
          }
        }
        this.dialogState = false;
        await this.$router.go();
      }
    },
  },
  beforeMount() {
    if (this.exercise) {
      this.name = this.exercise.name;
      this.detail = this.exercise.detail;
      this.imgUrl = this.exercise.metadata.imgUrl;
    }
  },
};
</script>
