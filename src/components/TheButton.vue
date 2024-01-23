<script setup lang="ts">

defineProps(
  {
    label: {
      type: String,
      default: "Click me"
    },
    cssClass: {
      type: String,
      default: "btn btn-primary"
    }
  }
)

</script>

<template>
  <button :class="cssClass" class="btn" @click="$emit('click')">{{label}}</button>
</template>

<style scoped lang="scss">

</style>