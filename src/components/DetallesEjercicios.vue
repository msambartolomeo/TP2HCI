<template>
  <v-navigation-drawer
    v-model="drawerState"
    absolute
    temporary
    width="400"
    right
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-btn
              class="ma-3"
              absolute
              right
              fab
              small
              color="secondary"
              @click="state = false"
            >
              <v-icon dark> mdi-close </v-icon>
            </v-btn>
            <v-img
              alt="exercice_logo"
              lazy-src="../assets/exercise picture.jpg"
              :src="
                imgError
                  ? '../assets/exercise picture.jpg'
                  : exercise.metadata.imgUrl
              "
              @error="imgError = true"
              contain
              height="300"
              width="300"
              class="mx-auto"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-2" dense>
        <h2>{{ exercise.name }}</h2>
      </v-row>
      <v-row><v-divider></v-divider></v-row>
      <v-row>
        <v-col>
          <v-btn block color="secondary" @click="editExercise = true">
            Editar
          </v-btn>
          <CreateExercise
            v-model="editExercise"
            v-if="editExercise"
            :exercise="exercise"
            @snackbar="snackbar"
          />
        </v-col>
        <v-col>
          <v-btn block color="error" @click="confirmedExit = true">
            Eliminar
          </v-btn>
        </v-col>
      </v-row>
      <v-row><v-divider></v-divider></v-row>
      <v-row justify="center">
        <v-col cols="10">
          <h4>Descripcion</h4>
          <h5>{{ exercise.detail }}</h5>
        </v-col>
      </v-row>
      <ConfirmedExit
        title="¿seguro que quiere eliminar?"
        text="Si continua perderá la información."
        v-model="confirmedExit"
        @confirm="DeleteClick"
      />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import CreateExercise from "./CreateExercise";
import ConfirmedExit from "./ConfirmedExit";
export default {
  name: "DetallesEjercicios",
  components: { ConfirmedExit, CreateExercise },
  props: {
    exercise: Object,
  },
  data() {
    return {
      state: false,
      editExercise: false,
      imgError: false,
      confirmedExit: false,
    };
  },
  computed: {
    drawerState: {
      get() {
        return this.state;
      },
      set(value) {
        this.state = value;
        if (!value) {
          setTimeout(() => this.$router.push("/ejercicios"), 100);
        }
      },
    },
  },
  methods: {
    snackbar(data) {
      this.$emit("snackbar", data);
    },

    DeleteClick() {
      this.$emit("DeleteClick", this.exercise.id);
      this.state = false;
    },
  },
  mounted() {
    setTimeout(() => (this.state = true), 1);
  },
};
</script>

<style scoped></style>
