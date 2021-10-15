import { Api } from "./api";

export { RoutineApi };

class RoutineApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
  }

  static async add(routine, controller) {
    return await Api.post(RoutineApi.getUrl(), true, routine, controller);
  }

  static async getRoutines(controller) {
    return await Api.get(RoutineApi.getUrl(), true, controller);
  }

  static async getRoutinesPage(page, size, controller) {
    return await Api.get(
      RoutineApi.getUrl(`?page=${page}&size=${size}`),
      true,
      controller
    );
  }

  static async getRoutine(id, controller) {
    return await Api.get(RoutineApi.getUrl(id), true, controller);
  }

  static async modifyRoutine(routine, routineId, controller) {
    return await Api.put(this.getUrl(routineId), true, routine, controller);
  }

  static async deleteRoutine(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller);
  }
}

export class Routine {
  constructor(name, detail, isPublic, difficulty, category, routineUrl) {
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.difficulty = difficulty;
    this.category = category;
    this.metadata = { routineUrl: routineUrl };
  }
}

export class RoutineCycle {
  constructor(name, type, order, repetitions) {
    this.name = name;
    this.detail = name;
    this.type = type;
    this.order = order;
    this.repetitions = repetitions;
  }
}
