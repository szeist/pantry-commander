declare module Spoonacular {
  export interface Ingredient {
      aisle: string;
      amount: number;
      id: number;
      image: string;
      metaInformation: string[];
      name: string;
      original: string;
      originalName: string;
      originalString: string;
      unit: string;
      unitLong: string;
      unitShort: string;
  }

  export interface Recipe {
      id: number;
      image: string;
      imageType: string;
      likes: number;
      missedIngredientCount: number;
      missedIngredients: Ingredient[];
      title: string;
      unusedIngredients: Ingredient[];
      usedIngredientCount: number;
      usedIngredients: Ingredient[];
  }

  export interface Metric {
      amount: number;
      unitLong: string;
      unitShort: string;
  }

  export interface Measures {
      metric: Metric;
      us: Metric;
  }

  export interface ExtendedIngredient {
      aisle: string;
      amount: number;
      consitency: string;
      id: number;
      image: string;
      measures: Measures;
      meta: string[];
      metaInformation: string[];
      name: string;
      original: string;
      originalName: string;
      originalString: string;
      unit: string;
  }

  export interface WinePairing {
      pairedWines: any[];
      pairingText: string;
      productMatches: any[];
  }

  export interface ReceipeInfo {
      id: number;
      title: string;
      image: string;
      imageType: string;
      servings: number;
      readyInMinutes: number;
      license: string;
      sourceName: string;
      sourceUrl: string;
      spoonacularSourceUrl: string;
      aggregateLikes: number;
      healthScore: number;
      spoonacularScore: number;
      pricePerServing: number;
      analyzedInstructions: any[];
      cheap: boolean;
      creditsText: string;
      cuisines: any[];
      dairyFree: boolean;
      diets: any[];
      gaps: string;
      glutenFree: boolean;
      instructions: string;
      ketogenic: boolean;
      lowFodmap: boolean;
      occasions: any[];
      sustainable: boolean;
      vegan: boolean;
      vegetarian: boolean;
      veryHealthy: boolean;
      veryPopular: boolean;
      whole30: boolean;
      weightWatcherSmartPoints: number;
      dishTypes: string[];
      extendedIngredients: ExtendedIngredient[];
      winePairing: WinePairing;
  }

}

