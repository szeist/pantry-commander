import { getJSON } from "tns-core-modules/http";

export class SpoonacularApi {
  static readonly _apiBaseUrl = 'https://api.spoonacular.com';

  private _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  public async getRecipesFor(ingredients: Array<string>): Promise<Array<Spoonacular.Recipe>> {
    const params = new Map([['ingredients', ingredients.join(',')]]);
    return this._get('/recipes/findByIngredients', params);
  }

  public async getRecipeInfo(id: number): Promise<Spoonacular.ReceipeInfo> {
    const escapedId = encodeURIComponent(id);
    return this._get(`/recipes/${escapedId}/information`);
  }

  private async _get(path: string, params?: Map<string, string>): Promise<any> {
    const queryParams = params ? params : new Map();
    const queryString = this._createQueryString(queryParams);
    const url = `${SpoonacularApi._apiBaseUrl}${path}?${queryString}`
    return getJSON(url);
  }

  private _createQueryString(params: Map<string, string>): string {
    const requestParams = [...Array.from(params.entries()), ['apiKey', this._apiKey]];
    const escapedParams = requestParams.map(
      (item) => encodeURIComponent(item[0]) + '=' + encodeURIComponent(item[1])
    );
    return escapedParams.join('&');
  }
}