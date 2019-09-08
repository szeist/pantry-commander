<template>
  <GridLayout columns="50, *">
      <Image col="0" :src="recipe.image" stretch="aspectFill" />
      <Label col="1" :text="recipe.title" />
  </GridLayout>
</template>

<script>
export default {
  name: 'recipe-item',

  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>