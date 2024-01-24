<script setup lang="ts">

import {ref} from "vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import TemplateSelector from "@/components/TemplateSelector.vue";
import TextArea from "@/components/TextArea.vue";
import TheButton from "@/components/TheButton.vue";
import OutputText from "@/components/OutputText.vue";
import TheDocs from "@/components/TheDocs.vue";
import {map2, mapText} from "@/services/mapper.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {getSourceWikitext} from "@/services/fetch.service.ts";
import TitleInput from "@/components/TitleInput.vue";
import {EnglishMapper} from "@/services/EnglishMapper.ts";

const sourceLanguage = ref(SUPPORTED_LANGUAGES.EN);
const targetLanguage = ref(SUPPORTED_LANGUAGES.IT);
const templateType = ref(SUPPORTED_TEMPLATE.SEE);
const articleTitle = ref("");

const inputText = ref("");
const mappedText = ref("");

// ------ HANDLERS ------

const handleSourceLanguageChange = (newValue: SUPPORTED_LANGUAGES) => {
  console.log("handleSourceLanguageChange", newValue);
  sourceLanguage.value = newValue;
};

const handleTargetLanguageChange = (newValue: SUPPORTED_LANGUAGES) => {
  console.log("handleTargetLanguageChange", newValue);
  targetLanguage.value = newValue;
};

const handleTemplateChange = (newValue: SUPPORTED_TEMPLATE) => {
  console.log("handleTemplateChange", newValue);
  templateType.value = newValue;
};

const handleArticleChange = (newValue: string) => {
  console.log("handleArticleChange", newValue);
  articleTitle.value = newValue;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(mappedText.value);
};

const saveText = (newValue: string) => {
  inputText.value = newValue;
};

const reset = () => {
  inputText.value = "";
  mappedText.value = "";
};


// ------ METHODS ------
const translateText = async () => {
  console.log("Trying to translate text");

  // TODO: add a strategy to select the right mapper
  const mapper = new EnglishMapper();


  const res = await mapper.map(articleTitle.value, targetLanguage.value, templateType.value);

  if (res) {
    mappedText.value = res;
  }
  else {
    mappedText.value = "Error -- Mapping failed";
  }
};

</script>

<template>

  <header class="container">
    <TheDocs/>
  </header>

  <main class="container align-content-center">

    <section class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-auto">
          <LanguageSelector :language="sourceLanguage" label="Source Voyage"
                            @update:language="handleSourceLanguageChange"/>
        </div>
        <div class="col-auto">
          <TemplateSelector v-model="templateType" @update:template="handleTemplateChange"/>
        </div>
        <div class="col-auto">
          <TitleInput @update:articleName="handleArticleChange"/>
        </div>
      </div>
    </section>

    <section>
<!--      <div class="row">-->
<!--        <div class="col">-->
<!--          <TextArea v-model="inputText" @update:text="saveText"/>-->
<!--        </div>-->
<!--      </div>-->

      <div class="row justify-content-center mt-3">
        <div class="col-auto">
          <LanguageSelector :language="targetLanguage" label="Target Language:"
                            @update:language="handleTargetLanguageChange"/>
        </div>
        <div class="col-auto">
          <TheButton label="Translate" class="btn-translate" @click="translateText"/>
        </div>
      </div>
    </section>


    <section>
      <div class="row">
        <div class="col">
          <OutputText :text="mappedText" label="Mapped text"/>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-auto">
          <TheButton label="Clean" class="me-2 btn-reset" @click="reset"/>
        </div>
        <div class="col-auto">
          <TheButton label="Copy to CLipboard" class="btn-copy" @click="copyToClipboard"/>
        </div>
      </div>
    </section>
  </main>

</template>

<style scoped lang="scss">
@import "@/scss/constants";

.btn-translate {
  background-color: $voy_2;
  border-color: $voy_2;
}

.btn-reset {
  background-color: $voy_1;
  border-color: $voy_1;
}

.btn-copy {
  background-color: $voy_2;
  border-color: $voy_2;
}


</style>