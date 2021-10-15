export default {
  rules: {
    required: (v) => !!v || "Este ítem es obligatorio",
    isEmail: (v) => /.+@.+\..+/.test(v) || "El email ingresado no es válido",
    isValidPassword: (v) =>
      v.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
    length100: (v) =>
      v.length <= 100 ||
      `Se ha excedido del máximo número de caracteres, el máximo es 100`,
    length50: (v) =>
      v.length <= 50 ||
      `Se ha excedido del máximo número de caracteres, el máximo es 50`,
    length200: (v) =>
      v.length <= 200 ||
      `Se ha excedido del máximo número de caracteres, el máximo es 200`,
    length255: (v) =>
      v.length <= 255 ||
      `Se ha excedido del máximo número de caracteres, el máximo es 255`,
    isNumber: (v) => (v && v > 0 && v < 1000) || "Solamente números positivos",
    mayora2: (v) => (v && v > 1) || "Mínimo 2",
  },
};
