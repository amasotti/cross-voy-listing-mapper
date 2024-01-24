
<script setup lang="ts">

defineProps({
  label: {
    type: String,
    default: 'Output text:'
  },
  text: {
    type: String,
    default: ''
  },
  template: {
    type: String,
    default: 'All templates'
  }
});


</script>


<template>
  <!-- Add a heading for this section containing the template name  -->
  <div  class="h3">{{template}}</div>


  <div class="text-area-container">
    <label for="outputText" class="text-area-label m-3">{{ label }}</label>
    <div id="outputText" class="text-area-output" >
      <pre>
      {{text}}
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/constants";

.text-area-container {
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
}

.text-area-label {
  white-space: nowrap;
  color: $voy_3;
}

.text-area-output {
  flex-grow: 1;
  border: 1px solid $voy_2;
  background-color: rgba($voy_2, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  overflow: auto;
  min-height: 250px;
  word-break: break-word; /* Ensures the text wraps within the div */
}
</style>
