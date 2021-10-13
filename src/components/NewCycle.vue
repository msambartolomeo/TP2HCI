<template>
  <v-dialog v-model="selected" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5">
        Inserte el nombre para la rutina
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="nombre"
          outlined
          color="primary"
          v-model="text"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cancel"> Cancelar </v-btn>
        <v-btn color="primary" text @click="confirm"> Confirmar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewCycle",
  props: {
    value: Boolean,
  },
  data() {
    return {
      text: null,
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    cancel() {
      this.text = null;
      this.$emit("input", false);
    },
    confirm() {
      let aux = this.text;
      this.text = null;
      this.$emit("input", false);
      this.$emit("confirm", aux);
    },
  },
};
</script>
