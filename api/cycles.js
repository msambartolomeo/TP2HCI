import { Api } from "./api";
import { RoutineApi } from "./routines";

export { CycleApi };

class CycleApi {
  static getUrl(routineID, slug) {
    return `${RoutineApi.getUrl(routineID)}/cycles${slug ? `${slug}` : ""}`;
  }

  static async add(routineID, cycle, controller) {
    return await Api.post(CycleApi.getUrl(routineID), true, cycle, controller);
  }
  static async delete(routineID, cycleID, controller) {
    return await Api.delete(
      CycleApi.getUrl(routineID, cycleID),
      true,
      controller
    );
  }
  static async get(routineID, controller) {
    return await Api.get(
      CycleApi.getUrl(routineID, "?orderBy=order"),
      true,
      controller
    );
  }
}
