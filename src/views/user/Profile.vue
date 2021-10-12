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
              <InputField label="Email" v-model="email" disabled />
              <InputField
                label="Nombre"
                v-model="firstName"
                :disabled="!editProfile"
                :rules="[rules.required]"
              />
              <InputField
                label="Apellido"
                v-model="lastName"
                :disabled="!editProfile"
                :rules="[rules.required]"
              />
              <GenderSelect v-model="gender" :disabled="!editProfile" />
              <BirthdatePicker :edit="editProfile" v-model="birthdate" />
              <InputField
                label="Link para foto de perfil"
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
                  :lazy-src="require('../../assets/profile_logo.jpg')"
                  :src="
                    this.imgError
                      ? require('../../assets/profile_logo.jpg')
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
            <v-col cols="8" lg="4" align-self="center" v-show="editProfile">
              <v-btn
                color="error"
                block
                @click="resetProfile"
                :disabled="savingChanges"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="8" lg="4" align-self="center" v-show="editProfile">
              <v-btn
                color="primary"
                block
                @click="updateProfile"
                :disabled="!valid || savingChanges"
              >
                Guardar
              </v-btn>
            </v-col>
            <v-col cols="8" align-self="center" v-show="!editProfile">
              <v-btn color="error" block @click="dialog = true">
                Borrar Cuenta
              </v-btn>
              <template>
                <v-dialog v-model="dialog" persistent max-width="400">
                  <v-card>
                    <v-card-title class="text-h5">
                      ¿Está seguro que quiere eliminar la cuenta?
                    </v-card-title>
                    <v-card-text>
                      Esta es una acción que no se puede deshacer
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        text
                        @click="deleteAccount"
                        :disabled="savingChanges"
                      >
                        Borrar
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                        :disabled="savingChanges"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import BirthdatePicker from "../../components/user/BirthdatePicker";
import rules from "../../jsmodules/rules";
import { EditUser } from "../../../api/user";
import GenderSelect from "../../components/user/GenderSelect";
import InputField from "../../components/user/InputField";
export default {
  name: "Profile",
  components: {
    InputField,
    GenderSelect,
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
      dialog: false,
      error: false,
      imgError: false,
    };
  },
  methods: {
    ...mapActions("user", {
      $editCurrentUser: "editCurrentUser",
      $getCurrentUser: "getCurrentUser",
      $deleteCurrentUser: "deleteCurrentUser",
    }),
    resetImg() {
      this.imgError = false;
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
      this.imgError = false;
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
    async deleteAccount() {
      this.savingChanges = true;
      this.showPass = false;
      try {
        await this.$deleteCurrentUser();
        await this.$router.push("/login");
      } catch (e) {
        this.error = true;
      } finally {
        this.editProfile = false;
        this.snackbar = true;
        this.savingChanges = false;
      }
    },
  },
  beforeMount() {
    this.resetProfile();
  },
};
</script>
