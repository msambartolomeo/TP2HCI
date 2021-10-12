import { Api } from "./api";

export { ExercisesApi };

class ExercisesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${slug ? `/${slug}` : ""}`;
  }

  static async add(exercise, controller) {
    return await Api.post(ExercisesApi.getUrl(), true, exercise, controller);
  }

  static async getExercises(controller) {
    return await Api.get(ExercisesApi.getUrl(), true, controller);
  }

  static async getExercise(id, controller) {
    return await Api.get(ExercisesApi.getUrl(id), true, controller);
  }

  static async modifyExercise(exercises, controller) {
    return await Api.put(
      this.getUrl(exercises.id),
      true,
      exercises,
      controller
    );
  }

  static async delete(id, controller) {
    return await Api.delete(ExercisesApi.getUrl(id), true, controller);
  }
}

export class exercises {
  constructor(id, name, detail) {
    if (id) this.id = id;
    this.name = name;
    this.detail = detail;
  }
}
