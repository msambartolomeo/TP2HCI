<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card elevation="10">
        <v-row justify="center" dense>
          <v-col cols="10" dense>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <h1 class="mt-10 text-center text-sm-h1 text-h2">WorkIn</h1>
              <v-img
                alt="profile_logo"
                :src="require('../../assets/profile_logo.jpg')"
              />
              <h1 class="text-center text-sm-h5 text-h6">
                Por favor inserte el código de verificación que fue enviado a su
                correo electrónico
              </h1>
              <InputField
                label="Código"
                v-model="code"
                :rules="[
                  rules.required,
                  (v) => !apiError || 'El codigo ingresado es incorrecto',
                ]"
              />
              <MainButton @click="verify" :disabled="!valid">
                Verificar
              </MainButton>
              <TextLink @click="resendVerification">
                ¿No recibió el código? Haga click aquí para enviarlo nuevamente
              </TextLink>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import rules from "../../jsmodules/rules";
import InputField from "../../components/user/InputField";
import TextLink from "../../components/user/TextLink";
import MainButton from "../../components/MainButton";
export default {
  name: "EmailVerification",
  components: { MainButton, TextLink, InputField },
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
          await this.$router.push("/");
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
