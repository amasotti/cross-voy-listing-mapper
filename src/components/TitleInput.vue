<script setup lang="ts">
import { ref, watch } from 'vue';

const articleName = ref('');
const emit = defineEmits(['update:articleName']);


watch(articleName, (newValue) => {
  emit('update:articleName', newValue);
});
</script>


<template>
    <div class="mb-4">
      <label for="articleName" class="block voy-blue m-2">Article Name:</label>
      <input type="text" id="articleName" v-model="articleName" class="box-shadow rounded py-1 px-2" placeholder="Enter article name">
    </div>
</template>


<style scoped>
.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Add additional styling as needed */
</style>
