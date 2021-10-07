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
        v-model="ffecha"
        label="Fecha de Nacimiento"
        prepend-inner-icon="event"
        :readonly="editProfile"
        outlined
        v-bind="attrs"
        v-on="on"
        :disabled="!editProfile"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="fecha"
      :active-picker.sync="activePicker"
      show-adjacent-months
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      "
      min="1900-01-01"
      @change="
        save();
        update();
      "
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "BirthdatePicker",
  data() {
    return {
      activePicker: null,
      menu: false,
    };
  },
  props: {
    editProfile: Boolean,
    fecha: Date,
  },
  watch: {
    menu() {
      setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ffecha() {
      return this.formatDate(this.fecha);
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
    update() {
      this.$emit("update", this.fecha);
    },
  },
};
</script>
