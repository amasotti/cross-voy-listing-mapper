
<script setup lang="ts">

import {PropType} from "vue";

defineProps({
  permalink: {
    required: false,
    default: "",
  } as PropType<string>,
})
</script>

<template>
  <div class="col px-4">
    <p><span class="fw-bold">Permalink: </span> <a :href="permalink">{{permalink}}</a></p>
    <p><em>Remember to give credit to the original author.</em></p>
  </div>
</template>
