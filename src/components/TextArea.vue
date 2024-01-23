<script setup lang="ts">

import {ref, watch} from "vue";

const text = ref("");
defineProps({
  label: {
    type: String,
    default: "Original text:"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:text'])

watch(text, (newValue) => {
  emit('update:text', newValue)
})

</script>

<template>
  <div class="text-area-container">
    <label for="expandableTextArea" class="text-area-label m-3">{{label}}</label>
    <textarea
        :disabled="disabled"
        id="expandableTextArea"
        v-model="text"
        :class="(disabled ? ' text-area-disabled' : 'text-area')"
    ></textarea>
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

.text-area {
  flex-grow: 1;
  border: 1px solid $voy_3;
  border-radius: 8px;
  padding: 0.5rem;
  resize: vertical;
  overflow: auto;
  min-height: 250px;

  &:focus {
    outline: none;
    border-color: $voy_2;
  }
}


.text-area-disabled {
  flex-grow: 1;
  border: 1px solid $voy_2;
  background-color: rgba($voy_2, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  resize: vertical;
  overflow: auto;
  min-height: 250px;
}
</style>