<script setup>
import { computed, ref } from "vue";
import FileModal from "./FileModal.vue";

const showModal = ref(false);

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});
const size = computed(() => {
  return Math.round(props.file.size / 1024).toString() + "KB";
});
</script>

<template>
  <div class="tile tile-centered">
    <div class="tile-icon">
      <div class="example-tile-icon">
        <i class="icon icon-file centered"></i>
      </div>
    </div>
    <div class="tile-content">
      <div class="tile-title">{{ file.name }}</div>
      <small class="tile-subtitle text-gray">
        Size: {{ size }} · Language:
        <span :style="{ backgroundColor: file.language.color }" class="chip">{{
          file.language.name
        }}</span></small
      >
    </div>
    <FileModal
      :filename="file.name"
      :content="file.text"
      :is-active="showModal"
      :lang-color="file.language.color"
      :language="file.language.name"
      @closeModal="showModal = false"
    />
    <div class="tile-action">
      <button @click="showModal = true" class="btn btn-link">View</button>
    </div>
  </div>
</template>

<style scoped>
.tile {
  padding: 5px;
  margin-top: 3px;
  border-color: lightgrey;
  border-style: solid;
  border-width: 1px;
}
.chip {
  color: white;
}
</style>
