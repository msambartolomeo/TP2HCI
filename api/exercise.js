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
    await Api.put(`${ExerciseApi.url}/${id}`, true, exercise, controller);
  }

  static async addExercise(exercise, controller) {
    return await Api.post(`${ExerciseApi.url}`, true, exercise, controller);
  }

  static async deleteExercise(exerciseId, controller) {
    await Api.delete(`${ExerciseApi.url}/${exerciseId}`, true, controller);
  }
}

class Exercise {
  constructor(id, name, detail, type) {
    if (id) this.id = id;
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.metadata = null;
  }
}
