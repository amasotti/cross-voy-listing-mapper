<script setup lang="ts">

import { ref, onMounted } from "vue";
import LanguageSelector from "../components/LanguageSelector.vue";

const sourceLanguage = ref("");
const targetLanguage = ref("");

// const templateType = ref("");
//
// const inputText = ref("");
// const outputText = ref("");

// const translateText = () => {
//   console.log("translateText");
// };

onMounted(() => {
  console.log("onMounted");
});


</script>

<template>
    <div class="container mx-auto p-4">
      <LanguageSelector v-model="sourceLanguage" label="Source Language:" />
<!--      <TemplateTypeSelector v-model="templateType" />-->
<!--      <TextInputArea v-model="inputText" />-->
<!--      <TranslateButton @click="translateText" />-->
      <LanguageSelector v-model="targetLanguage" label="Target Language:" />
<!--      <TextOutputArea :text="outputText" />-->
    </div>
</template>

<style scoped>

</style>