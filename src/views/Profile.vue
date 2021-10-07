<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7">
          <v-row justify="center" no-gutters>
            <v-col cols="3">
              <h1 class="mt-8 mb-5">Mi perfil</h1>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="primary"
                v-show="!editProfile"
                @click="editProfile = true"
              >
                Editar
              </v-btn>
            </v-col>
            <v-col cols="7">
              <v-text-field
                label="Nombre"
                outlined
                v-model="nnombre"
                :disabled="!editProfile"
              />
              <v-text-field
                label="Apellido"
                outlined
                v-model="napellido"
                :disabled="!editProfile"
              />
              <v-select
                :items="['M', 'F']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="ngenero"
                :disabled="!editProfile"
              />
              <v-text-field
                label="Email"
                outlined
                v-model="nemail"
                :disabled="!editProfile"
              />
              <BirthdatePicker
                :edit="editProfile"
                :fecha="nfecha"
                @update="updateDate"
              />
              <v-text-field
                v-model="npassword"
                :append-icon="showPass ? 'visibility' : 'visibility_off'"
                :type="showPass ? 'text' : 'password'"
                label="Contraseña"
                hint="Por lo menos 8 caracteres"
                counter
                @click:append="showPass = !showPass"
                outlined
                :disabled="!editProfile"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" align-self="center">
          <v-img
            :src="require('../assets/profile_logo.jpg')"
            contain
            max-height="640"
            max-width="480"
            class="mx-auto"
          />
        </v-col>
      </v-row>
      <v-row class="mt-16" justify="center">
        <v-col cols="2" align-self="center">
          <v-btn color="error" v-show="editProfile" @click="resetProfile">
            Cancelar
          </v-btn>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn color="primary" v-show="editProfile" @click="updateProfile">
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import BirthdatePicker from "../components/BirthdatePicker";
export default {
  name: "Profile",
  components: {
    BirthdatePicker,
  },
  data() {
    return {
      nombre: "Pepe",
      apellido: "Rodriguez",
      genero: "M",
      email: "prodriguez@itba.edu.ar",
      fecha: "2000-01-01",
      password: "12345678",
      nnombre: null,
      napellido: null,
      ngenero: null,
      nemail: null,
      nfecha: null,
      npassword: null,
      editProfile: false,
      showPass: false,
    };
  },
  methods: {
    updateDate(date) {
      this.nfecha = date;
    },
    resetProfile() {
      this.nnombre = this.nombre;
      this.nfecha = this.fecha;
      this.ngenero = this.genero;
      this.napellido = this.apellido;
      this.nemail = this.email;
      this.npassword = this.password;
      this.editProfile = false;
      this.showPass = false;
    },
    updateProfile() {
      this.nombre = this.nnombre;
      this.fecha = this.nfecha;
      this.genero = this.ngenero;
      this.apellido = this.napellido;
      this.email = this.nemail;
      this.password = this.npassword;
      this.editProfile = false;
      this.showPass = false;
    },
  },
  beforeMount() {
    this.resetProfile();
  },
};
</script>
