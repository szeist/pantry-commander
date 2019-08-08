<template>
    <Page>
        <ActionBar title="Pantry Commander" android:flat="true" />
        <TabView>
            <TabViewItem title="Pantry">
                <GridLayout rows="*, 50">
                    <ListView row="0" for="item in pantry">
                        <v-template>
                            <GridLayout columns="*, 50">
                                <Label col="0" :text="item.name" />
                                <Button col="1" text="Del" @tap="deleteFromPantry" />
                            </GridLayout>
                        </v-template>
                    </ListView>
                    <Button row="1" text="Add" @tap="addToPantry" />
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Recipes">
                <GridLayout rows="50, *">
                    <Button row="0" text="Get recipes" @tap="fetchRecipes" />
                    <ListView row="1" for="recipe in recipes" @itemTap="onRecipeTap">
                        <v-template>
                            <GridLayout columns="50, *">
                                <Image col="0" :src="recipe.image" stretch="aspectFill" />
                                <Label col="1" :text="recipe.name" />
                            </GridLayout>
                        </v-template>
                    </ListView>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import * as dialogs from "tns-core-modules/ui/dialogs";
    import { request, getJSON } from "tns-core-modules/http";
    import * as utils from "tns-core-modules/utils/utils";
    import { SecureStorage } from 'nativescript-secure-storage';

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

    export default {
        data() {
            return {
                pantry: [],
                recipes: [],
            }
        },

        mounted() {
            this.$store.subscribe((mutations, state) => {
                this.fridge = state.fridge;
                this.pantry = state.pantry;
            });
            this.$store.commit("load");
        },

        methods: {
            addToPantry: function() {
                const store = this.$store;
                dialogs.prompt({
                    title: "New Pantry Item",
                    okButtonText: "Add",
                    cancelButtonText: "Cancel"
                }).then(function(result) {
                    if (result.result && result.text.trim() !==
                        "") {
                        store.commit("addToPantry", {name: result.text})
                    }
                }, this);
            },

            deleteFromPantry: function(item) {
                this.$store.commit("removeFromPantry", item);
            },

            fetchRecipes: async function() {
                const url = 'https://api.spoonacular.com/recipes/findByIngredients';
                const ingredients = encodeURIComponent((this.pantry.map((item) => item.name)).join(","));
                const apiKey = await getApiKey();

                const recipes = this.recipes;
                getJSON(url + '?ingredients=' + ingredients + '&apiKey=' + apiKey).then((r: any) => {
                    recipes.splice(0, recipes.length);
                    r.forEach(function(recipe) {
                        const slug = recipe.title
                            .toLowerCase()
                            .replace(/ /g,'-')
                            .replace(/[^\w-]+/g,'');
                        const link = 'https://spoonacular.com/' + slug + '-' + recipe.id
                        recipes.push(({ id: recipe.id, name: recipe.title, image: recipe.image, link: link }));
                    }); 
                    }, (e) => {
                        dialogs.alert(e.message);
                });
            },

            onRecipeTap: async function(args) {
                const recipe = args.item;
                const url = 'https://api.spoonacular.com/recipes/' + recipe.id + '/information';
                const apiKey = await getApiKey();
                const recipes = this.recipes;
                getJSON(url + '?apiKey=' + apiKey).then((r: any) => {
                    utils.openUrl(r.sourceUrl);
                }, (e) => {
                    dialogs.alert(e.message);
                });
            }
        }
    }
</script>

<style scoped>
</style>