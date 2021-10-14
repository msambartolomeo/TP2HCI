<template>
  <v-dialog
    max-width="800px"
    v-model="dialogState"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title class="text-h5">{{
          exercise ? "Modificar Ejercicio" : "Crear Nuevo Ejercicio"
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Nombre"
                    v-model="name"
                    :rules="[rules.required]"
                  />
                  <v-textarea
                    auto-grow
                    outlined
                    label="Drecripcion"
                    v-model="detail"
                    :rules="[rules.required]"
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
          <v-btn color="red darken-1" text x-large @click="dialogState = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text x-large @click="saveExercise">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { Exercise } from "../../api/exercise";
import rules from "../jsmodules/rules";

export default {
  name: "CreateExercise",
  props: {
    exercise: Object,
    value: Boolean,
  },
  data: () => ({
    name: null,
    detail: null,
    imgUrl: null,
    imgError: false,
    rules: rules.rules,
    valid: true,
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
        const exercise = new Exercise(this.name, this.detail, this.imgUrl);
        if (this.exercise) {
          try {
            await this.editExercise({
              exercise: exercise,
              id: this.exercise.id,
            });
          } catch (e) {
            //mostrar error
          }
        } else {
          try {
            await this.create(exercise);
          } catch (e) {
            //mostrar error
          }
        }
        this.dialogState = false;
        await this.$router.push("/ejercicios");
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
