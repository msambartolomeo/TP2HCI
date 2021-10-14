import { Api } from "./api";

export { ExerciseApi, Exercise };

class ExerciseApi {
  static get url() {
    return `${Api.baseUrl}/exercises`;
  }

  static async getExercises(controller) {
    return await Api.get(`${ExerciseApi.url}?size=30`, true, controller);
  }

  static async getExerciseById(id, controller) {
    return await Api.get(`${ExerciseApi.url}/${id}`, true, controller);
  }

  static async editExercise(exercise, id, controller) {
    return await Api.put(
      `${ExerciseApi.url}/${id}`,
      true,
      exercise,
      controller
    );
  }

  static async addExercise(exercise, controller) {
    return await Api.post(`${ExerciseApi.url}`, true, exercise, controller);
  }

  static async deleteExercise(exerciseId, controller) {
    return await Api.delete(
      `${ExerciseApi.url}/${exerciseId}`,
      true,
      controller
    );
  }
}

class Exercise {
  constructor(name, detail, imgUrl) {
    this.name = name;
    this.detail = detail;
    this.type = "exercise";
    this.metadata = { imgUrl: imgUrl ? imgUrl : "" };
  }
}
