<script setup>
import FileItem from "./FileItem.vue";
const props = defineProps({
  files: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <FileItem v-for="file in files" :key="file.name" :file="file" />
  </div>
</template>
