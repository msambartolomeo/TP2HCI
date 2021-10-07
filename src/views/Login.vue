<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card>
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
            <v-btn color="primary" @click="login()" block>login</v-btn>
            <p @click="register()" class="mt-6 text-center link">
              No tienes una cuenta? Registrate!
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
    login() {
      // authenticate
      const redirectPath = this.$route.query.redirect || "/";
      this.$router.push(redirectPath);
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
  text-decoration: none;
  font-weight: bold;
}
.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
