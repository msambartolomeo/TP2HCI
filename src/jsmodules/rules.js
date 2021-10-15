export default {
  rules: {
    required: (v) => !!v || "Este ítem es obligatorio",
    isEmail: (v) => /.+@.+\...+/.test(v) || "El email ingresado no es válido",
    isValidPassword: (v) => {
      if (v) {
        return (
          v.length >= 8 || "La contraseña debe tener al menos 8 caracteres"
        );
      }
      return true;
    },
    length100: (v) => {
      if (v) {
        return (
          v.length <= 100 ||
          `Se ha excedido del máximo número de caracteres, el máximo es 100`
        );
      }
      return true;
    },
    length50: (v) => {
      if (v) {
        return (
          v.length <= 50 ||
          `Se ha excedido del máximo número de caracteres, el máximo es 50`
        );
      }
      return true;
    },
    length200: (v) => {
      if (v) {
        return (
          v.length <= 200 ||
          `Se ha excedido del máximo número de caracteres, el máximo es 200`
        );
      }
      return true;
    },
    length255: (v) => {
      if (v) {
        return (
          v.length <= 255 ||
          `Se ha excedido del máximo número de caracteres, el máximo es 255`
        );
      }
      return true;
    },
    isNumber: (v) => (v >= 0 && v < 1000) || "Solamente números positivos",
    mayora2: (v) => (v && v > 1) || "Mínimo 2",
  },
};
