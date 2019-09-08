<template>
  <Page>
    <ActionBar title="Pantry Commander" android:flat="true" />
    <TabView selectedIndex="1">
      <TabViewItem title="Expiring">
        <PantryList row="0" :items="expiringItems" />
      </TabViewItem>
      <TabViewItem title="Pantry">
        <GridLayout rows="*, 50">
          <PantryList row="0" :items="pantry" />
          <Button row="1" text="Add" @tap="addToPantry" />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Recipes">
        <GridLayout rows="50, *">
          <GridLayout row="0" columns="auto, auto">
            <Button col="0" text="from pantry" @tap="fromPantryTap" />
            <Button col="1" text="from expiring" @tap="fromExpiringTap" />
          </GridLayout>
          <RecipeList row="1" :recipes="recipes" />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script lang="ts">
  import * as dialogs from 'tns-core-modules/ui/dialogs';
  import * as utils from 'tns-core-modules/utils/utils';
  import { SecureStorage } from 'nativescript-secure-storage';
  import { SpoonacularApi } from '../lib/spoonacular';

  import PantryList from './PantryList.vue';
  import RecipeList from './RecipeList.vue';

  const secureStorage = new SecureStorage();

  async function getApiKey() {
    const apiKey = await secureStorage.get({key: 'apiKey'});

    if (apiKey) {
      return apiKey;
    } else {
      const result = await dialogs.prompt({
        title: "API Key",
        okButtonText: "Save",
        cancelButtonText: "Cancel"
      });

      if (result.result && result.text.trim() !== "") {
        secureStorage.setSync({key: 'apiKey', value: result.text});
      }

      return result.text;
    }
  }

  async function createRecipes(ingredients) {
    const apiKey = await getApiKey();
    const api = new SpoonacularApi(apiKey);
    return api.getRecipesFor(ingredients.map((i) => i.name));
  }

  export default {
    components: {
      PantryList,
      RecipeList
    },

    data() {
      return {
        pantry: [],
        recipes: [],
      }
    },

    mounted() {
      this.$store.subscribe((mutations, state) => {
        this.pantry = state.pantry;
      });
      this.$store.commit("load");
    },

    methods: {
      addToPantry: async function() {
        const nameResult = await dialogs.prompt({
          title: "Item Name",
          okButtonText: "Next",
          cancelButtonText: "Cancel"
        });
        if (!nameResult.result || nameResult.text.trim() === "") {
          return;
        }
        const name = nameResult.text.trim();

        const expiryResult = await dialogs.prompt({
          title: "Item Expiry",
          okButtonText: "Next",
          cancelButtonText: "Cancel"
        });
        if (!expiryResult.result || expiryResult.text.trim() === "") {
          return;
        }
        const expiry = new Date(expiryResult.text);

        this.$store.commit("addToPantry", {name, expiry})
      },

      deleteButtonTap: function(args) {
        this.$store.commit("removeFromPantry", args.object.bindingContext);
      },

      fromPantryTap: async function() {
        const recipes = await createRecipes(this.pantry);
        this.recipes.splice(0, this.recipes.length);
        recipes.forEach(function(item) {
          this.recipes.push(item);
        }, this);
      },

      fromExpiringTap: async function() {
        const recipes = await createRecipes(this.expiringItems);
        this.recipes.splice(0, this.recipes.length);
        recipes.forEach(function(item) {
          this.recipes.push(item);
        }, this);
      }
    },

    computed: {
      expiringItems: function() {
        const expiryInterval = 5;
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + expiryInterval);
        return this.pantry.filter(function(item) {
          return item.expiry <= deadline;
        });
      }
    }
  }
</script>

<style scoped>
</style>