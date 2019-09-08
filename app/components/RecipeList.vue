<template>
  <ListView for="recipe in recipes" @itemTap="onRecipeTap">
    <v-template>
      <RecipeItem :recipe="recipe" />
    </v-template>
  </ListView>
</template>

<script>
import RecipeItem from './RecipeItem.vue';

export default {
  name: 'recipe-list',

  components: {
    RecipeItem
  },

  props: {
    recipes: {
      type: Array,
      required: true
    }
  },

  methods: {
    onRecipeTap: async function(args) {
      // const recipe: Spoonacular.Recipe = args.item;
      // const apiKey = await getApiKey();
      // const api = new SpoonacularApi(apiKey);
      // const recipeInfo = await api.getRecipeInfo(recipe.id);
      // utils.openUrl(recipeInfo.sourceUrl);
    }
  }
}
</script>