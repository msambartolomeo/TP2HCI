export default {
  rules: {
    required: (v) => !!v || "Este item es obligatorio",
    isEmail: (v) => /.+@.+\..+/.test(v) || "El email ingresado no es valido",
    isValidPassword: (v) =>
      (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
    length100: (v) =>
      (v && v.length <= 100) ||
      `Se ha exedido del maximo numero de caracteres, el maximo es 100`,
    length50: (v) =>
      (v && v.length <= 50) ||
      `Se ha exedido del maximo numero de caracteres, el maximo es 50`,
    length200: (v) =>
      (v && v.length <= 200) ||
      `Se ha exedido del maximo numero de caracteres, el maximo es 200`,
    length255: (v) =>
      (v && v.length <= 255) ||
      `Se ha exedido del maximo numero de caracteres, el maximo es 255`,
    isNumber: (v) => (v && v > 0 && v < 1000) || "Solamente numeros positivos",
    mayora2: (v) => (v && v > 1) || "Minimo 2",
  },
};
