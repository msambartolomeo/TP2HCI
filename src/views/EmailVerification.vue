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
            <h1 class="text-center text-sm-h5 text-h6">
              Por favor inserte el codigo de verificacion que fue enviado a su
              correo
            </h1>
            <v-text-field label="Código" outlined v-model="code"></v-text-field>
            <v-btn color="primary" @click="verify" block class="mb-7"
              >Verificar</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EmailVerification",
  data() {
    return {
      code: null,
    };
  },
  methods: {
    verify() {
      this.$router.push("/login");
    },
  },
};
</script>
