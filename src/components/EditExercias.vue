<template>
  <v-dialog
    max-width="800px"
    v-model="dialogState"
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        block
        slot="activator"
        v-on="on"
        color="primary"
        text
        elevation="1"
      >
        Editar
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">Editar Ejercicio</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Nombre"
                  v-model="newName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  auto-grow
                  outlined
                  label="Drecripcion"
                  v-model="newDetail"
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
  name: "EditExercias",

  props: {
    exercise: {
      id: Number,
      name: String,
      detail: String,
    },
  },

  data: () => ({
    dialogState: false,
    newName: null,
    newDetail: null,
  }),

  methods: {
    ...mapActions("exercise", ["editExercise"]),

    async saveDialog() {
      if (this.newName.isEmpty) {
        alert(`el name esta vacio`);
        return;
      }
      if (this.newDetail.isEmpty) {
        alert(`el detail esta vacio`);
        return;
      }

      const editExercise = new Exercise(null, this.newName, this.newDetail);
      try {
        await this.editExercise({
          exercise: editExercise,
          id: this.exercise.id,
        });
      } catch (e) {
        //mostrar error
      }

      this.closeDialog();
    },

    closeDialog() {
      this.$emit("closeDrawer");
      this.newName = this.exercise.name;
      this.newDetail = this.exercise.detail;
      this.dialogState = false;
    },
  },

  beforeMount() {
    this.newName = this.exercise.name;
    this.newDetail = this.exercise.detail;
  },
};
</script>
