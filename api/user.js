import { Api } from "./api.js";

export { UserApi, Credentials, NewUser, EditUser };

class UserApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/users${slug ? `/${slug}` : ""}`;
  }

  static async login(credentials, controller) {
    return await Api.post(
      UserApi.getUrl("login"),
      false,
      credentials,
      controller
    );
  }

  static async logout(controller) {
    await Api.post(UserApi.getUrl("logout"), true, null, controller);
  }

  static async verify(email, code, controller) {
    await Api.post(
      UserApi.getUrl("verify_email"),
      false,
      { email: email, code: code },
      controller
    );
  }

  static async resend_verify(email, controller) {
    await Api.post(
      UserApi.getUrl("resend_verification"),
      false,
      { email: email },
      controller
    );
  }

  static async add(newUser, controller) {
    return await Api.post(UserApi.getUrl(), false, newUser, controller);
  }

  static getUrlCurrent(slug) {
    return `${UserApi.getUrl("current")}${slug ? `/${slug}` : ""}`;
  }

  static async delete(controller) {
    await Api.delete(UserApi.getUrlCurrent(), true, controller);
  }

  static async get(controller) {
    return await Api.get(UserApi.getUrlCurrent(), true, null, controller);
  }

  static async edit(editUser, controller) {
    return await Api.put(UserApi.getUrlCurrent(), true, editUser, controller);
  }

  static async routines(controller) {
    return await Api.get(UserApi.getUrlCurrent("routines"), true, controller);
  }
}

class Credentials {
  constructor(email, password) {
    this.username = email;
    this.password = password;
  }
}

class NewUser {
  constructor(email, password, firstName, lastName, gender, birthdate) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    this.username = email;
    this.email = email;
    if (birthdate) this.birthdate = new Date(birthdate).getTime();
    if (gender) {
      switch (gender) {
        case "Masculino":
          this.gender = "male";
          break;
        case "Femenino":
          this.gender = "female";
          break;
        case "Otro":
          this.gender = "other";
          break;
      }
    }
    this.password = password;
  }
}

class EditUser {
  constructor(firstName, lastName, gender, birthdate, avatarUrl) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (birthdate) this.birthdate = new Date(birthdate).getTime();
    if (gender) {
      switch (gender) {
        case "Masculino":
          this.gender = "male";
          break;
        case "Femenino":
          this.gender = "female";
          break;
        case "Otro":
          this.gender = "other";
          break;
      }
    }
    if (!avatarUrl) {
      this.avatarUrl = "";
    } else this.avatarUrl = avatarUrl;
  }
}
