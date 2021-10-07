<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card elevation="10">
        <v-row justify="center" dense>
          <v-col cols="10" dense>
            <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkLn</h1>
            <h1 class="ma-10 text-center text-sm-h4 text-h5">Crear cuenta</h1>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Nombre"
                outlined
                v-model="nombre"
                :rules="[rules.required]"
                required
              />
              <v-text-field
                label="Apellido"
                outlined
                v-model="apellido"
                :rules="[rules.required]"
                required
              />
              <v-text-field
                label="Email"
                outlined
                v-model="email"
                :rules="[rules.required, rules.isEmail]"
                required
              />
              <BirthdatePicker
                :fecha="fecha"
                :edit="true"
                @update="updateDate"
              />
              <v-select
                :items="['M', 'F']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="genero"
              />
              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'visibility' : 'visibility_off'"
                :type="showPass ? 'text' : 'password'"
                label="Contraseña"
                hint="Por lo menos 8 caracteres"
                counter
                @click:append="showPass = !showPass"
                outlined
                :rules="[rules.required, rules.isValidPassword]"
                required
              />
              <v-text-field
                v-model="rpassword"
                :append-icon="showRPass ? 'visibility' : 'visibility_off'"
                :type="showRPass ? 'text' : 'password'"
                label="Repita la contraseña"
                counter
                @click:append="showRPass = !showRPass"
                outlined
                :rules="[rules.required, rules.passwordEquals]"
              />
            </v-form>
            <v-btn
              color="primary"
              class="mb-5"
              @click="register()"
              block
              :disabled="!valid"
              >Crear cuenta</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BirthdatePicker from "../components/BirthdatePicker";
export default {
  name: "Register",
  components: { BirthdatePicker },
  data() {
    return {
      showPass: false,
      showRPass: false,
      valid: true,
      nombre: null,
      apellido: null,
      genero: null,
      email: null,
      fecha: null,
      password: null,
      rpassword: null,
      rules: {
        required: (v) => !!v || "Este item es obligatorio",
        isEmail: (v) =>
          /.+@.+\..+/.test(v) || "El email ingresado no es valido",
        isValidPassword: (v) =>
          (v && v.length >= 8) ||
          "La contraseña debe tener al menos 8 caracteres",
        passwordEquals: (v) =>
          v === this.password || "Las contraseñas no coinciden",
      },
    };
  },
  methods: {
    updateDate(date) {
      this.fecha = date;
    },
    register() {
      if (this.$refs.form.validate()) {
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath);
      }
    },
  },
};
</script>
