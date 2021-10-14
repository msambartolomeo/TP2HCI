import { Api } from "./api";
export { CycleExercisesApi };

class CycleExercisesApi {
  static getUrl(cycleID, slug) {
    return `${Api.baseUrl}/cycles/${cycleID}/exercises${
      slug ? `/${slug}` : ""
    }`;
  }

  static async add(cycleID, exerciseID, exerciseData, controller) {
    return await Api.post(
      CycleExercisesApi.getUrl(cycleID, exerciseID),
      true,
      exerciseData,
      controller
    );
  }

  static async get(cycleID, controller) {
    return await Api.get(CycleExercisesApi.getUrl(cycleID), true, controller);
  }

  static async delete(cycleID, exerciseID, controller) {
    return await Api.delete(
      CycleExercisesApi.getUrl(cycleID, exerciseID),
      true,
      controller
    );
  }
}
