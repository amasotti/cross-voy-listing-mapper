<script setup lang="ts">
import {languages} from "../constants/languages";
import {onMounted, ref} from "vue";

const selectedLanguage = ref("en");

onMounted(() => {
  console.log("onMounted lnaguage selector");
});

</script>

<template>
  <div class="mb-4">
    <h1>Hallo Language</h1>
    <label class="block text-sm font-bold mb-2">"Something"</label>
    <select v-model="selectedLanguage" class="shadow border rounded py-2 px-3">
      <option v-for="language in languages" :key="language.id" :value="language.value">{{ language.label }}</option>
    </select>
  </div>
</template>

<style scoped>

</style>