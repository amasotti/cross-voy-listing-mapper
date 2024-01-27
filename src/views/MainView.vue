<script setup lang="ts">

import {ref} from "vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import TemplateSelector from "@/components/TemplateSelector.vue";
import TheButton from "@/components/TheButton.vue";
import OutputText from "@/components/OutputText.vue";
import TheDocs from "@/components/TheDocs.vue";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";
import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import TitleInput from "@/components/TitleInput.vue";
import {chooseMapper} from "@/services/mapper/mapper.strategy.ts";
import {AbstractMapper} from "@/services/mapper/AbstractMapper.ts";
import FetchService from "@/services/fetch.service.ts";
import PermalinkHint from "@/components/PermalinkHint.vue";

const sourceLanguage = ref<SUPPORTED_LANGUAGES>(SUPPORTED_LANGUAGES.EN);
const targetLanguage = ref<SUPPORTED_LANGUAGES>(SUPPORTED_LANGUAGES.IT);
const templateType = ref<SUPPORTED_TEMPLATE>(SUPPORTED_TEMPLATE.SEE);
const articleTitle = ref<string>("");

const mappedText = ref<string>("");
const permalink = ref<string>("");

// ------ HANDLERS ------

const handleSourceLanguageChange = (newValue: SUPPORTED_LANGUAGES) => {
  sourceLanguage.value = newValue;
};

const handleTargetLanguageChange = (newValue: SUPPORTED_LANGUAGES) => {
  targetLanguage.value = newValue;
};

const handleTemplateChange = (newValue: SUPPORTED_TEMPLATE) => {
  templateType.value = newValue;
};

const handleArticleChange = (newValue: string) => {
  // Encode for URL for cases like "Edinburgh/Leith" containing a slash or "Côte d'Azur" containing a special character
  const encodedArticle = encodeURIComponent(newValue);
  articleTitle.value = encodedArticle;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(mappedText.value);
};

const reset = () => {
  mappedText.value = "";
  permalink.value = "";
};


// ------ METHODS ------
const translateText = async () => {

  let mapper: AbstractMapper;
  try {
    //mapper = chooseMapper(sourceLanguage.value)
    mapper = chooseMapper(SUPPORTED_LANGUAGES.DE);
  } catch (error) {
    console.error("Error while choosing mapper", error);
    mappedText.value = "Error -- Still working on this language. Be patient or help me ;)";
    return;
  }

  const res = await mapper.map(articleTitle.value, targetLanguage.value, templateType.value);

  if (res) {
    mappedText.value = res;
    const fetchService = new FetchService(SUPPORTED_LANGUAGES.DE);
    const url = await fetchService.getLastRevionUrl(articleTitle.value);
    permalink.value = url;
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
      <div v-if="permalink" class="row justify-content-center mt-3">
        <PermalinkHint :permalink="permalink"/>
      </div>
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