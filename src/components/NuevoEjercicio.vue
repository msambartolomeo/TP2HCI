<template>
  <v-dialog
    max-width="800px"
    v-model="dialog"
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn flat slot="activator" v-on="on" color="primary"
        >Añadir ejercicio</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h5">Nuevo Ejercicio</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field outlined label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea auto-grow outlined label="Descripción"></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img :src="require('../assets/logo.svg')" contain></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NuevoEjercicio",
  data: () => ({
    dialog: false,
  }),
};
</script>
