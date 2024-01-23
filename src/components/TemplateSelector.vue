<script setup lang="ts">
import {ref} from 'vue';
import {templates} from "@/constants/templates.ts";

const selectedTemplateType = ref('')



</script>


<template>
  <div class="mb-4">
    <label for="templateType" class="block text-gray-700 text-sm font-bold mb-2">Template Type:</label>
    <select id="templateType" v-model="selectedTemplateType" class="shadow border rounded py-2 px-3 text-gray-700">

      <option v-for="template in templates" :key=" 'template-' + template.id" :value="template.id">
        {{template.label}}
      </option>

    </select>
  </div>
</template>


