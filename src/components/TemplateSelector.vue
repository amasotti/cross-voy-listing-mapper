<script setup lang="ts">
import {ref, watch} from 'vue';
import {templates} from "@/constants/templates.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";

const selectedTemplate = ref(SUPPORTED_TEMPLATE.SEE);
const emit = defineEmits(['update:template'])

watch(selectedTemplate, (newValue) => {
  emit('update:template', newValue)
})



</script>


<template>
  <div class="mb-4">
    <label for="template" class="block voy-blue m-2">Template:</label>
    <select id="template" v-model="selectedTemplate" class="box-shadow rounded py-1 px-2">
      <option v-for="template in templates" :key=" 'template-' + template.id" :value="template.value">
        {{template.label}}
      </option>

    </select>
  </div>
</template>


