<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card elevation="10">
        <v-row justify="center" dense>
          <v-col cols="10" dense>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkLn</h1>
              <v-img
                alt="profile_logo"
                :src="require('../assets/profile_logo.jpg')"
              />
              <h1 class="text-center text-sm-h5 text-h6">
                Por favor inserte el codigo de verificacion que fue enviado a su
                correo
              </h1>
              <v-text-field
                label="Código"
                outlined
                v-model="code"
                :rules="[
                  rules.required,
                  (v) => !apiError || 'El codigo ingresado es incorrecto',
                ]"
              />
              <v-btn color="primary" @click="verify" block :disabled="!valid">
                Verificar
              </v-btn>
              <p
                @click="resendVerification"
                class="mt-6 text-center link font-weight-bold color"
              >
                ¿No recibió el codigo? Haga click aqui para enviarlo nuevamente
              </p>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import rules from "../jsmodules/rules";
export default {
  name: "EmailVerification",
  data() {
    return {
      code: null,
      rules: rules.rules,
      valid: true,
      apiError: false,
    };
  },
  methods: {
    ...mapActions("user", {
      $verifyEmail: "verifyEmail",
      $resendVerificationEmail: "resendVerificationEmail",
    }),
    async resendVerification() {
      await this.$resendVerificationEmail();
    },
    async verify() {
      if (this.$refs.form.validate()) {
        try {
          const code = this.code;
          await this.$verifyEmail({ code });
          await this.$router.push("/login");
        } catch (e) {
          this.apiError = true;
          this.$refs.form.validate();
        } finally {
          this.apiError = false;
        }
      }
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
