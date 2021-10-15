<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col sm="8" cols="12" md="6">
          <v-text-field solo label="Buscar" prepend-inner-icon="search" />
        </v-col>
        <v-col sm="4" md="2" cols="12" class="pt-md-4">
          <MainButton @click="modifyRoutine = true">
            Crear nueva rutina
          </MainButton>
          <ModifyRoutine
            v-model="modifyRoutine"
            :id="null"
            v-if="modifyRoutine"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="routine in this.$getRoutines"
          :key="routine.id"
          md="3"
          xl="2"
        >
          <Routine
            :title="routine.name"
            :difficulty="routine.difficulty"
            :score="routine.score"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <v-pagination
          v-model="pagination"
          :length="$getMaxPage"
          @input="updateRoutines"
        />
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Routine from "../components/Routine";
import ModifyRoutine from "../components/ModifyRoutine";
import MainButton from "../components/MainButton";
import { mapActions, mapGetters } from "vuex";

const DEFAULT_PAGE_SIZE = 12;
export default {
  name: "MisRutinas",
  components: {
    MainButton,
    ModifyRoutine,
    Routine,
  },
  data: () => ({
    pagination: 1,
    modifyRoutine: false,
    routineId: null,
  }),
  computed: {
    ...mapGetters("routines", {
      $getMaxPage: "getMaxPage",
      $getRoutines: "getRoutines",
    }),
  },
  methods: {
    ...mapActions("routines", {
      $getRoutinesPage: "getRoutinesUser",
    }),
    async updateRoutines() {
      await this.$getRoutinesPage({
        page: this.pagination - 1,
        size: DEFAULT_PAGE_SIZE,
      });
    },
  },
  async beforeMount() {
    await this.$getRoutinesPage({ page: 0, size: DEFAULT_PAGE_SIZE });
  },
};
</script>

<style scoped>
.container {
  height: 80vh;
}
</style>
