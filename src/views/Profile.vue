<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7">
          <v-row justify="center" no-gutters>
            <v-col cols="3">
              <h1 class="mt-8 mb-5">Mi perfil</h1>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="primary"
                v-show="!editProfile"
                @click="editProfile = true"
              >
                Editar
              </v-btn>
            </v-col>
            <v-col cols="7"
              ><v-text-field
                label="Nombre"
                outlined
                v-model="nnombre"
                :disabled="!editProfile"
            /></v-col>
            <v-col cols="7"
              ><v-text-field
                label="Apellido"
                outlined
                v-model="napellido"
                :disabled="!editProfile"
            /></v-col>
            <v-col cols="7"
              ><v-select
                :items="['M', 'F']"
                label="Genero"
                outlined
                append-icon="expand_more"
                v-model="ngenero"
                :disabled="!editProfile"
            /></v-col>
            <v-col cols="7"
              ><v-text-field
                label="Email"
                outlined
                v-model="nemail"
                :disabled="!editProfile"
              ></v-text-field>
            </v-col>
            <v-col cols="7"
              ><v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fnfecha"
                    label="Fecha de Nacimiento"
                    prepend-inner-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    :disabled="!editProfile"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="nfecha"
                  :active-picker.sync="activePicker"
                  show-adjacent-months
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1900-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="7">
              <v-text-field
                v-model="npassword"
                :append-icon="showPass ? 'visibility' : 'visibility_off'"
                :type="showPass ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPass = !showPass"
                outlined
                :disabled="!editProfile"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" align-self="center">
          <v-row justify="center" no-gutters>
            <v-col>
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_from_a_camera.jpg/1200px-Black_from_a_camera.jpg"
                contain
                max-height="640"
                max-width="480"
                class="mx-auto"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-16" justify="center">
        <v-col cols="2" align-self="center">
          <v-btn color="error" v-show="editProfile" @click="resetProfile">
            Cancelar
          </v-btn>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn color="primary" v-show="editProfile" @click="updateProfile">
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Profile.vue",
  data: () => ({
    nombre: "Pepe",
    apellido: "Rodriguez",
    genero: "M",
    email: "prodriguez@itba.edu.ar",
    fecha: "2000-01-01",
    password: "12345678",
    nnombre: null,
    napellido: null,
    ngenero: null,
    nemail: null,
    nfecha: null,
    npassword: null,
    activePicker: null,
    menu: false,
    editProfile: false,
    showPass: false,
  }),
  watch: {
    menu() {
      setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    fnfecha() {
      return this.formatDate(this.nfecha);
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    resetProfile() {
      this.nnombre = this.nombre;
      this.nfecha = this.fecha;
      this.ngenero = this.genero;
      this.napellido = this.apellido;
      this.nemail = this.email;
      this.npassword = this.password;
      this.editProfile = false;
      this.showPass = false;
    },
    updateProfile() {
      this.nombre = this.nnombre;
      this.fecha = this.nfecha;
      this.genero = this.ngenero;
      this.apellido = this.napellido;
      this.email = this.nemail;
      this.password = this.npassword;
      this.editProfile = false;
      this.showPass = false;
    },
  },
  beforeMount() {
    this.resetProfile();
  },
};
</script>
