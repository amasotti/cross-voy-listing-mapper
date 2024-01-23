<script setup lang="ts">

import {ref, onMounted, watch} from "vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import TemplateSelector from "@/components/TemplateSelector.vue";
import TextArea from "@/components/TextArea.vue";
import TheButton from "@/components/TheButton.vue";

const sourceLanguage = ref("");
const targetLanguage = ref("");
const templateType = ref("");


const inputText = ref("");
// const outputText = ref("");

// const translateText = () => {
//   console.log("translateText");
// };

const handleSourceLanguageChange = (newValue) => {
  console.log("handleSourceLanguageChange", newValue);
  sourceLanguage.value = newValue;
};

const handleTargetLanguageChange = (newValue) => {
  console.log("handleTargetLanguageChange", newValue);
  targetLanguage.value = newValue;
};

const handleTemplateChange = (newValue) => {
  console.log("handleTemplateChange", newValue);
};



</script>

<template>
    <main class="container align-content-center">

      <section class="container">
        <div class="row">
         <div class="col">
        <LanguageSelector language="sourceLanguage" label="Source Language" @update:language="handleSourceLanguageChange"/>
          </div>
          <div class="col">
        <TemplateSelector v-model="templateType" @update:template="handleTemplateChange"  />
          </div>
        </div>
      </section>


      <section>
        <TextArea v-model="inputText" />
      </section>



      <LanguageSelector language="targetLanguage" label="Target Language:" @update:language="handleTargetLanguageChange"/>


      <section>
        <div class="row">
          <div class="col">
        <TextArea v-model="inputText" label="Mapped text" :disabled="true"/>
            </div>
        </div>
          <div class="row">
            <div class="col">
              <TheButton label="Translate" />
            </div>
          <div class="col">
            <TheButton label="Translate" />
          </div>
        </div>
      </section>
    </main>

</template>

<style scoped>

</style>