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
                v-model="firstName"
                :rules="[rules.required]"
                required
              />
              <v-text-field
                label="Apellido"
                outlined
                v-model="lastName"
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
              <BirthdatePicker v-model="birthdate" />
              <v-select
                :items="['Masculino', 'Femenino', 'Otro']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="gender"
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
                :append-icon="showRPass ? 'visibility' : 'visibility_off'"
                :type="showRPass ? 'text' : 'password'"
                label="Repita la contraseña"
                counter
                @click:append="showRPass = !showRPass"
                outlined
                :rules="[
                  rules.required,
                  (v) => v === password || 'Las contraseñas no coinciden',
                ]"
                required
              />
            </v-form>
            <v-btn
              color="primary"
              class="mb-7"
              @click="register"
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
import { mapActions } from "vuex";
import BirthdatePicker from "../components/BirthdatePicker";
import rules from "../jsmodules/rules";
import { NewUser } from "../../api/user";
export default {
  name: "Register",
  components: { BirthdatePicker },
  data() {
    return {
      showPass: false,
      showRPass: false,
      valid: true,
      firstName: null,
      lastName: null,
      gender: null,
      email: null,
      birthdate: null,
      password: null,
      rules: rules.rules,
    };
  },
  methods: {
    ...mapActions("user", {
      $addUser: "addUser",
    }),
    async register() {
      if (this.$refs.form.validate()) {
        const newUser = new NewUser(
          this.email,
          this.password,
          this.firstName,
          this.lastName,
          this.gender,
          this.birthdate
        );
        await this.$addUser({ newUser });
        await this.$router.push("/email_verification");
      }
    },
  },
};
</script>
