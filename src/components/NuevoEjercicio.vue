<template>
  <v-dialog
    max-width="800px"
    v-model="dialogState"
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block slot="activator" v-on="on" color="primary"
        >Crear Ejercicio</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h5">Nuevo Ejercicio</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Nombre"
                  v-model="nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  auto-grow
                  outlined
                  label="Descripción"
                  v-model="descripcion"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img :src="require('../assets/logo.svg')" contain></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="createExercise">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { Exercise } from "../../api/exercise";

export default {
  name: "NuevoEjercicio",

  data: () => ({
    dialogState: false,
    nombre: null,
    descripcion: null,
    exerciseType: "exercise",
  }),

  methods: {
    ...mapActions("exercise", ["create"]),

    async createExercise() {
      if (this.nombre.isEmpty) {
        //mostrar error
        return;
      }
      if (this.descripcion.isEmpty) {
        //mostrar error
        return;
      }
      const newExercise = new Exercise(
        null,
        this.nombre,
        this.descripcion,
        this.exerciseType
      );
      try {
        await this.create(newExercise);
      } catch (e) {
        //mostrar error
      }
      this.closeDialog();
    },

    closeDialog() {
      this.nombre = null;
      this.descripcion = null;
      this.dialogState = false;
    },
  },
};
</script>
