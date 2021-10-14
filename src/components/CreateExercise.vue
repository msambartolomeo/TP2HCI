<template>
  <v-dialog
    max-width="800px"
    v-model="dialogState"
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block slot="activator" v-on="on" color="primary" elevation="1">
        Crear Ejercicio
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">Crear Nuevo Ejercicio</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Nombre"
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  auto-grow
                  outlined
                  label="Drecripcion"
                  v-model="detail"
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
        <v-btn color="red darken-1" text x-large @click="closeDialog"
          >Close</v-btn
        >
        <v-btn color="blue darken-1" text x-large @click="saveDialog"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { Exercise } from "../../api/exercise";

export default {
  name: "CreateExercise",

  data: () => ({
    dialogState: false,
    name: null,
    detail: null,
  }),

  methods: {
    ...mapActions("exercise", ["create"]),

    async saveDialog() {
      if (this.name.isEmpty) {
        alert(`el name esta vacio`);
        return;
      }
      if (this.detail.isEmpty) {
        alert(`el detail esta vacio`);
        return;
      }

      const exercise = new Exercise(null, this.name, this.detail);

      try {
        await this.create(exercise);
      } catch (e) {
        //mostrar error
      }

      this.closeDialog();
    },

    closeDialog() {
      this.id = null;
      this.name = null;
      this.detail = null;
      this.dialogState = false;
    },
  },
};
</script>
