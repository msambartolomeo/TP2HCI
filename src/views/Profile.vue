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
              <v-text-field label="Email" outlined v-model="email" disabled />
              <v-text-field
                label="Nombre"
                outlined
                v-model="firstName"
                :disabled="!editProfile"
                :rules="[rules.required]"
              />
              <v-text-field
                label="Apellido"
                outlined
                v-model="lastName"
                :disabled="!editProfile"
                :rules="[rules.required]"
              />
              <v-select
                :items="['Masculino', 'Femenino', 'Otro']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="gender"
                :disabled="!editProfile"
              />
              <BirthdatePicker
                :edit="editProfile"
                :fecha="birthdate"
                @update="updateDate"
              />
              <v-text-field
                label="Link para foto de perfil"
                outlined
                v-model="avatarUrl"
                :disabled="!editProfile"
                hint="Puede utilizar una pagina como igmur para subir sus fotos"
                @input="resetImg"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" align-self="center">
          <v-row justify="center">
            <v-col cols="8" class="mt-16">
              <v-card elevation="10">
                <v-img
                  alt="profile_logo"
                  :lazy-src="require('../assets/profile_logo.jpg')"
                  :src="
                    this.imgError
                      ? require('../assets/profile_logo.jpg')
                      : this.avatarUrl
                  "
                  v-on:error="imgError = true"
                  contain
                  height="500"
                  width="400"
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
                :disabled="savingChanges"
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
                :disabled="!valid || savingChanges"
              >
                Guardar
              </v-btn>
              <v-snackbar v-model="snackbar" timeout="2500">
                {{
                  error
                    ? "Se ha producido un error, intente nuevamente"
                    : "¡Los cambios se han guardado con exito!"
                }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    :color="error ? 'error' : 'primary'"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Cerrar
                  </v-btn>
                </template>
              </v-snackbar>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import BirthdatePicker from "../components/BirthdatePicker";
import rules from "../jsmodules/rules";
import { EditUser } from "../../api/user";
export default {
  name: "Profile",
  components: {
    BirthdatePicker,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      gender: null,
      email: null,
      birthdate: null,
      avatarUrl: null,
      editProfile: false,
      savingChanges: false,
      rules: rules.rules,
      valid: true,
      snackbar: false,
      error: false,
      imgError: false,
    };
  },
  methods: {
    ...mapActions("user", {
      $editCurrentUser: "editCurrentUser",
      $getCurrentUser: "getCurrentUser",
    }),
    resetImg() {
      this.imgError = false;
    },
    updateDate(date) {
      this.birthdate = date;
    },
    async resetProfile() {
      this.showPass = false;
      const user = await this.$getCurrentUser();
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      if (user.gender) {
        switch (user.gender) {
          case "male":
            this.gender = "Masculino";
            break;
          case "female":
            this.gender = "Femenino";
            break;
          case "other":
            this.gender = "Otro";
            break;
        }
      }
      this.email = user.email;
      if (user.birthdate) {
        let date = new Date(user.birthdate);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
          day = `0${day}`;
        }
        if (month < 10) {
          month = `0${month}`;
        }
        this.birthdate = `${year}-${month}-${day}`;
      }
      this.avatarUrl = user.avatarUrl;
      this.editProfile = false;
      this.savingChanges = false;
    },
    async updateProfile() {
      this.savingChanges = true;
      this.showPass = false;
      if (this.$refs.form.validate()) {
        const editUser = new EditUser(
          this.firstName,
          this.lastName,
          this.gender,
          this.birthdate,
          this.avatarUrl
        );
        try {
          await this.$editCurrentUser({ editUser });
          this.error = false;
        } catch (e) {
          this.error = true;
        } finally {
          this.editProfile = false;
          this.snackbar = true;
          this.savingChanges = false;
        }
      }
    },
  },
  beforeMount() {
    this.resetProfile();
  },
};
</script>
