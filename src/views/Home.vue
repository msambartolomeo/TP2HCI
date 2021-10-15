<template>
  <div>
    <v-container fluid class="container">
      <v-row>
        <v-col>
          <v-row justify="center">
            <v-col sm="8" cols="12" md="6">
              <v-text-field solo label="Buscar" prepend-inner-icon="search" />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="routine in $getRoutines"
              :key="routine.id"
              md="3"
              xl="2"
            >
              <Routine :routine="routine" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <router-view :key="$route.path" />
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <v-pagination
          color="secondary"
          v-model="pagination"
          :length="$getMaxPage"
          @input="updateRoutines"
        ></v-pagination>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Routine from "@/components/Routine";
import { mapActions, mapGetters } from "vuex";

const DEFAULT_PAGE_SIZE = 12;
export default {
  name: "Inicio",
  components: {
    Routine,
  },

  data: () => ({
    pagination: 1,
    drawer: false,
  }),

  computed: {
    ...mapGetters("routines", {
      $getMaxPage: "getMaxPage",
      $getRoutines: "getRoutines",
    }),
  },

  methods: {
    ...mapActions("routines", {
      $getRoutinesPage: "getRoutinesPage",
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
  min-height: 80vh;
}
</style>
