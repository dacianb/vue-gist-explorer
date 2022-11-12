<script setup>
import { computed } from "vue";
import { isEmpty } from "lodash";

const props = defineProps({
  filename: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  language: {
    type: String,
  },
  langColor: {
    type: String,
  },
});

defineEmits(["closeModal"]);

const lang = computed(() => {
  return !isEmpty(props.language)
    ? props.language.toLowerCase()
    : "language-plaintext";
});
</script>

<template>
  <div class="modal modal-lg" :class="{ active: isActive }">
    <a
      href="#close"
      class="modal-overlay"
      @click="$emit('closeModal')"
      aria-label="Close"
    ></a>
    <div class="modal-container">
      <div class="modal-header">
        <a
          class="btn btn-clear float-right"
          aria-label="Close"
          @click="$emit('closeModal')"
        ></a>
        <div class="modal-title h5">
          {{ filename }}
          <span :style="{ backgroundColor: langColor }" class="chip">{{
            language
          }}</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="content">
          <highlightjs :code="content" :language="lang" />
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>
<style scoped>
.chip {
  color: white;
}
</style>
