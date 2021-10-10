<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card elevation="10">
        <v-row justify="center" dense>
          <v-col cols="10" dense>
            <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkLn</h1>
            <v-img
              alt="profile_logo"
              :src="require('../assets/profile_logo.jpg')"
            ></v-img>
            <v-text-field label="Email" outlined v-model="email"></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              @click:append="showPass = !showPass"
              outlined
            ></v-text-field>
            <v-btn color="primary" @click="login()" block>Login</v-btn>
            <p
              @click="register()"
              class="mt-6 text-center link font-weight-bold color"
            >
              ¿No tienes una cuenta? ¡Registrate!
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { Credentials } from "../../api/user";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      showPass: false,
    };
  },
  methods: {
    ...mapActions("user", {
      $login: "login",
    }),
    async login() {
      const credentials = new Credentials("johndoe", "1234567890");
      await this.$login({ credentials });
      const redirectPath = this.$route.query.redirect || "/";
      await this.$router.push(redirectPath);
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.link {
  color: #2c3e50;
}
.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
