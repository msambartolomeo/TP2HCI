<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
    content-class="menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="fdate"
        label="Fecha de Nacimiento"
        prepend-inner-icon="event"
        :readonly="edit"
        outlined
        v-bind="attrs"
        v-on="on"
        :disabled="!edit"
      />
    </template>
    <v-date-picker
      @input="$emit('input', $event)"
      v-model="selected"
      :active-picker.sync="activePicker"
      show-adjacent-months
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      "
      min="1900-01-01"
      @change="save"
    />
  </v-menu>
</template>

<script>
export default {
  name: "BirthdatePicker",
  props: {
    value: String,
    edit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activePicker: null,
      menu: false,
    };
  },
  watch: {
    menu() {
      setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    fdate() {
      return this.formatDate(this.value);
    },
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
    save(date) {
      this.$refs.menu.save(date);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
