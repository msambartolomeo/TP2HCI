<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm="8" cols="12" md="6">
        <v-text-field solo label="Buscar" prepend-inner-icon="search" />
      </v-col>
      <v-col sm="4" md="2" cols="12" class="pt-md-4">
        <NuevaRutina />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="routine in $getRoutines" :key="routine.id" md="3" xl="2">
        <Routine
          :title="routine.name"
          :difficulty="routine.difficulty"
          :score="routine.score"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="end">
      <v-col cols="8">
        <v-pagination v-model="pagination" :length="$getMaxPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Routine from "../components/Routine";
import NuevaRutina from "../components/NuevaRutina";
import { mapActions, mapGetters } from "vuex";

const DEFAULT_PAGE_SIZE = 12;
export default {
  name: "MisRutinas",
  components: {
    NuevaRutina,
    Routine,
  },
  data: () => ({
    pagination: 1,
  }),
  computed: {
    ...mapGetters("routines", {
      $getMaxPage: "getMaxPage",
      $getRoutines: "getRoutines",
    }),
  },
  methods: {
    ...mapActions("routines", {
      $getRoutines: "getRoutines",
      $getRoutinesPage: "getRoutinesUser",
    }),
    async updateRoutines() {
      await this.$getRoutinesPage({ page: this.pagination - 1, size: DEFAULT_PAGE_SIZE })
    },
  },
  async beforeMount() {
    await this.$getRoutinesPage({ page: 0, size: DEFAULT_PAGE_SIZE });
  },
};
</script>
