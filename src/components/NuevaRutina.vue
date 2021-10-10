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
      <v-card-title class="text-h4">Información de la rutina</v-card-title>
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
                <v-col cols="6">
                  <h5 class="text--black text-h5">Dificultad</h5>
                </v-col>
                <v-col cols="6">
                  <v-input v-model="dificultad" :rules="[rules.required]">
                    <RatingDificultad
                      :readonly="false"
                      :size="40"
                      :difficulty="dificultad"
                      @notifyRating="updateRating"
                    />
                  </v-input>
                </v-col>
                <v-col cols="6">
                  <h5 class="text--black text-h5">Categoría</h5>
                </v-col>
                <v-col cols="6">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Seleccionar
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item) in items"
                        :key="item.title"
                      >
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="6">
            <v-row justify="center">
              <v-img :src="require('../assets/logo.svg')" contain max-width="400" max-height="400"></v-img>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title class="text-h4">Ciclos y ejercicios</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <h1 class="text-h5">Entrada en Calor</h1>
          </v-col>
          <v-spacer />
          <v-col cols="3">
            <v-text-field outlined label="Numero de Repeticiones"></v-text-field>
          </v-col>
        </v-row>
        <v-divider />
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
    items: [
      { title: 'Categoria 1' },
      { title: 'Categoria 2' },
    ],
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
    updateRating(rating) {
      this.dificultad = rating;
    }
  },
};
</script>
