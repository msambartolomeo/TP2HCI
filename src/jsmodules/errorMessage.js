export default {
  data() {
    return {
      errorMessage: null,
    };
  },
  getErrorMessage(code) {
    switch (code) {
      case 0:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 1:
        this.errorMessage = "Datos ingresados inválidos";
        break;
      case 2:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 3:
        this.errorMessage = "No se pudo encontrar";
        break;
      case 4:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 5:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 6:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 7:
        this.errorMessage = "Nombre de usuario o contraseña INVALIDO";
        break;
      case 8:
        this.errorMessage = "Primero debe verificar su email";
        break;
      default:
        this.errorMessage = "Se ha producido un error, intente nuevamente";
    }
    return  this.errorMessage;
  },

};
