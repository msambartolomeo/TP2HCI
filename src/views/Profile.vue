<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-row justify="center">
            <v-col cols="8" lg="4">
              <p
                class="
                  mt-8
                  text-lg-h3 text-md-h2 text-h1 text-center text-lg-start
                "
              >
                Mi perfil
              </p>
            </v-col>
            <v-col cols="8" lg="4" align-self="center">
              <v-btn
                class="mt-lg-8"
                color="primary"
                v-show="!editProfile"
                @click="editProfile = true"
                block
              >
                Editar
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Nombre"
                outlined
                v-model="nnombre"
                :disabled="!editProfile"
                :rules="[rules.required]"
              />
              <v-text-field
                label="Apellido"
                outlined
                v-model="napellido"
                :disabled="!editProfile"
                :rules="[rules.required]"
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
                :rules="[rules.required, rules.isEmail]"
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
                :rules="[rules.required, rules.isValidPassword]"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" align-self="center">
          <v-row justify="center">
            <v-col cols="8">
              <v-card elevation="10">
                <v-img
                  :src="require('../assets/profile_logo.jpg')"
                  contain
                  max-height="640"
                  max-width="480"
                  class="mx-auto"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row justify="center">
            <v-col cols="8" lg="4" align-self="center">
              <v-btn
                color="error"
                v-show="editProfile"
                block
                @click="resetProfile"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="8" lg="4" align-self="center">
              <v-btn
                color="primary"
                v-show="editProfile"
                block
                @click="updateProfile"
                :disabled="!valid"
              >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import BirthdatePicker from "../components/BirthdatePicker";
import rules from "../jsmodules/rules";
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
      rules: rules.rules,
      valid: true,
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
      if (this.$refs.form.validate()) {
        this.nombre = this.nnombre;
        this.fecha = this.nfecha;
        this.genero = this.ngenero;
        this.apellido = this.napellido;
        this.email = this.nemail;
        this.password = this.npassword;
        this.editProfile = false;
        this.showPass = false;
      }
    },
  },
  beforeMount() {
    this.resetProfile();
  },
};
</script>
