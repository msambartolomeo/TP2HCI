<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card>
          <v-toolbar dense>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-toolbar-title>Buscar</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col>
        <NuevoEjercicio />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NuevoEjercicio from "@/components/NuevoEjercicio";
export default {
  name: "Mis Ejercicios",
  components: { NuevoEjercicio },
};
</script>
