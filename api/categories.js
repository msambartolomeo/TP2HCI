import { Api } from "./api";

export { CategoryApi };

class CategoryApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/categories${slug ? `/${slug}` : ""}`;
  }

  static async getAll(controller) {
    return Api.get(CategoryApi.getUrl(), false, controller);
  }
}

export class Category {
  constructor(categoryID) {
    this.id = categoryID;
  }
}
