<template>
  <v-dialog v-model="selected" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text> {{ text }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <MainButton @click="$emit('input', false)" :disabled="disabled">
          Cancelar
        </MainButton>
        <MainButton
          color="error"
          @click="$emit('confirm')"
          :disabled="disabled"
        >
          {{ btnText }}
        </MainButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MainButton from "./TextButton";
export default {
  name: "ConfirmedExit",
  components: { MainButton },
  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      default: "Confirmar",
    },
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
};
</script>
