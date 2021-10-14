<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row justify="center">
            <v-col sm="8" cols="12" md="6">
              <v-text-field solo label="Buscar" prepend-inner-icon="search" />
            </v-col>
            <v-col sm="4" md="2" cols="12" class="pt-md-4">
              <v-btn block color="primary"> Orden </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="routine in $getRoutines"
              :key="routine.id"
              md="3"
              xl="2"
            >
              <Routine
                :title="routine.name"
                :difficulty="1"
                :score="routine.score"
                @click="drawer = true"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" absolute width="400" right>
      <DetallesRutinas @click="drawer = false" />
    </v-navigation-drawer>
    <v-row justify="center" align="end">
      <v-col cols="8">
        <v-pagination
          v-model="pagination"
          :length="$getMaxPage"
          @input="updateRoutines"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Routine from "@/components/Routine";
import DetallesRutinas from "../components/DetallesRutinas";
import { mapActions, mapGetters } from "vuex";

const DEFAULT_PAGE_SIZE = 12;
export default {
  name: "Inicio",
  components: {
    DetallesRutinas,
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
