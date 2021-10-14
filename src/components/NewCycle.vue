<template>
  <v-dialog v-model="selected" persistent max-width="400">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card>
        <v-card-title class="text-h5">
          Inserte el nombre para la rutina
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre"
            outlined
            color="primary"
            v-model="text"
            :rules="[rules.required]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancel"> Cancelar </v-btn>
          <v-btn color="primary" text @click="confirm" :disabled="!valid">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import rules from "../jsmodules/rules";
export default {
  name: "NewCycle",
  props: {
    value: Boolean,
  },
  data() {
    return {
      text: null,
      valid: true,
      rules: rules.rules,
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
      this.$refs.form.reset();
      this.$emit("input", false);
    },
    confirm() {
      if (this.$refs.form.validate()) {
        let aux = this.text;
        this.$refs.form.reset();
        this.$emit("input", false);
        this.$emit("confirm", aux);
      }
    },
  },
};
</script>
