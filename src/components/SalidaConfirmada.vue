<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        ¿Está seguro que quiere salir?
      </v-card-title>
      <v-card-text>
        Perderá la información de la rutina, sin crearla.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="notifyParent"> Salir </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Seguir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SalidaConfirmada",
  data: () => ({
    dialog: false,
  }),
  methods: {
    notifyParent() {
      this.$emit("reset");
    },
  },
};
</script>
