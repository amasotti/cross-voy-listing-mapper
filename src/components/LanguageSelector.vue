<script setup lang="ts">
import {languages} from "../constants/languages";
import { ref, watch} from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Language:"
  },
  language: {
    type: String,
    default: ""
  }
});

const chosenLanguage = ref(props.language);

const emit = defineEmits(['update:language'])
watch(chosenLanguage, (newValue) => {
  emit('update:language', newValue)
})

</script>

<template>
  <div class="mb-4">
    <label class="block m-2 voy-blue">{{ label }}</label>
    <select v-model="chosenLanguage" class="box-shadow rounded py-1 px-2">
      <option v-for="language in languages" :key=" 'language-' + language.id" :value="language.value">{{ language.label }}</option>
    </select>
  </div>
</template>
