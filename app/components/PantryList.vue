<template>
  <ListView row="0" for="item in items">
    <v-template>
      <PantryItem :item="item" />
    </v-template>
  </ListView>
</template>

<script>
import PantryItem from './PantryItem.vue'

export default {
  name: 'pantry-list',

  components: {
    PantryItem
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>