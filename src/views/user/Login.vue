<template>
  <div>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="4">
        <v-card elevation="10">
          <v-row justify="center" dense>
            <v-col cols="10" dense>
              <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkIn</h1>
              <v-img
                alt="profile_logo"
                :src="require('../../assets/profile_logo.jpg')"
              />
              <InputField label="Email" v-model="email" />
              <PasswordField v-model="password" />
              <MainButton @click="login">Login</MainButton>
              <TextLink @click="register">
                ¿No tienes una cuenta? ¡Registrate!
              </TextLink>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar v-model="snackbar" :error="error">
      {{ error ? errorMessage : "se ha iniciado sesión correctamente" }}
    </SnackBar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Credentials } from "../../../api/user";
import InputField from "../../components/user/InputField";
import PasswordField from "../../components/user/PasswordField";
import TextLink from "../../components/user/TextLink";
import MainButton from "../../components/MainButton";
import SnackBar from "../../components/SnackBar";

export default {
  name: "Login",
  components: { SnackBar, MainButton, TextLink, PasswordField, InputField },
  data() {
    return {
      email: null,
      password: null,
      showPass: false,
      snackbar: false,
      error: false,
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions("user", {
      $login: "login",
    }),
    async login() {
      const credentials = new Credentials(this.email, this.password);
      try {
        await this.$login({ credentials });
      } catch (e) {
        this.errorMessage = this.getErrorMessage(e.code);
        this.error = true;
      } finally {
        this.snackbar = true;
      }
      const redirectPath = this.$route.query.redirect || "/";
      await this.$router.push(redirectPath);
    },
    register() {
      this.$router.push("/register");
    },

    getErrorMessage(code) {
      let errorMessage;
      switch (code) {
        case 0:
        case 5:
          errorMessage = "Estamos teniendo un problema interno, intente mas tarde";
          break;
        case 4:
          errorMessage = "Nombre de usuario o contraseña INVALIDO";
          break;
        case 8:
          errorMessage = "Primero debe verificar su email";
          break;
        default:
          errorMessage = "Se ha producido un error, intente nuevamente";
      }
      return errorMessage;
    },
  },
};
</script>
