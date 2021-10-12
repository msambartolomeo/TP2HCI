<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card elevation="10">
        <v-row justify="center" dense>
          <v-col cols="10" dense>
            <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkLn</h1>
            <h1 class="ma-10 text-center text-sm-h4 text-h5">Crear cuenta</h1>
            <v-form ref="form" v-model="valid" lazy-validation>
              <InputField
                label="Nombre"
                v-model="firstName"
                :rules="[rules.required]"
              />
              <InputField
                label="Apellido"
                v-model="lastName"
                :rules="[rules.required]"
              />
              <InputField
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.isEmail]"
              />
              <BirthdatePicker v-model="birthdate" />
              <GenderSelect v-model="gender" />
              <PasswordField
                v-model="password"
                hint="Por lo menos 8 caracteres"
                :rules="[rules.required, rules.isValidPassword]"
              />
              <PasswordField
                label="Repita la contraseña"
                :rules="[
                  rules.required,
                  (v) => v === password || 'Las contraseñas no coinciden',
                ]"
              />
            </v-form>
            <MainButton @click="register" :disabled="!valid">
              Crear cuenta
            </MainButton>
            <TextLink @click="login">
              ¿Ya tiene una cuenta? Haga click aqui iniciar sesión
            </TextLink>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import BirthdatePicker from "../../components/user/BirthdatePicker";
import rules from "../../jsmodules/rules";
import { NewUser } from "../../../api/user";
import PasswordField from "../../components/user/PasswordField";
import GenderSelect from "../../components/user/GenderSelect";
import InputField from "../../components/user/InputField";
import TextLink from "../../components/user/TextLink";
import MainButton from "../../components/MainButton";
export default {
  name: "Register",
  components: {
    MainButton,
    TextLink,
    InputField,
    GenderSelect,
    PasswordField,
    BirthdatePicker,
  },
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
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
