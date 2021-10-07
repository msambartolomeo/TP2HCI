<template>
  <v-dialog
    fullscreen
    v-model="dialog"
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block slot="activator" v-on="on" color="primary"
        >Crear nueva rutina</v-btn
      >
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <SalidaConfirmada @reset="reset" />
        <v-toolbar-title>Crear nueva rutina</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="verifyData"> Guardar </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title class="text-h5">Información de la rutina</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Nombre"
                    v-model="nombre"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    auto-grow
                    outlined
                    label="Descripción"
                    v-model="descripcion"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-col>
                <v-col>
                  <div class="align-center">
                    <h5 class="text--black text-h5">Dificultad:</h5>
                    <v-input :rules="[rules.required]" :value="dificultad">
                      <RatingDificultad
                        :readonly="false"
                        :size="40"
                        v-model="dificultad"
                        :rules="[rules.required]"
                      />
                    </v-input>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="6">
            <v-img :src="require('../assets/logo.svg')" contain></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import RatingDificultad from "@/components/RatingDificultad";
import SalidaConfirmada from "@/components/SalidaConfirmada";
export default {
  name: "NuevaRutina",
  components: { SalidaConfirmada, RatingDificultad },
  data: () => ({
    dialog: false,
    nombre: null,
    descripcion: null,
    dificultad: null,
    valid: true,
    rules: {
      required: (value) => !!value || "Este item es obligatorio",
    },
  }),
  methods: {
    verifyData() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.resetValidation();
      this.nombre = null;
      this.descripcion = null;
      this.dificultad = null;
      this.dialog = false;
    },
  },
};
</script>
