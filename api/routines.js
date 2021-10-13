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

  static async getRoutine(id, controller) {
    return await Api.get(RoutineApi.getUrl(id), true, controller);
  }

  static async modifyRoutine(routine, controller) {
    return await Api.put(this.getUrl(routine.id), true, routine, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller);
  }
}

export class Routine {
  constructor(id, name, detail, isPublic, difficulty, category) {
    if (id) this.id = id;
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    switch (difficulty) {
      case 1:
        this.difficulty = "rookie";
        break;
      case 2:
        this.difficulty = "intermediate";
        break;
      case 3:
        this.difficulty = "expert";
        break;
    }
    this.category = category;
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
