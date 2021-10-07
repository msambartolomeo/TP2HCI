export default {
  rules: {
    required: (v) => !!v || "Este item es obligatorio",
    isEmail: (v) => /.+@.+\..+/.test(v) || "El email ingresado no es valido",
    isValidPassword: (v) =>
      (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
  },
};
