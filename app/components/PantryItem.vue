<template>
  <GridLayout columns="*, 50">
      <GridLayout col="0" rows="*, 30">
          <Label row="0" :text="item.name" />
          <Label row="1" :text="item.expiry" />
      </GridLayout>
  </GridLayout>
</template>

<script>
export default {
  name: "pantry-item",
  props: {
    item: {
      type: Object,
      required: true
    }
  } 
}
</script>