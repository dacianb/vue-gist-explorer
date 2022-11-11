<script setup>
import { ref } from "vue";

const searchQuery = ref("");

const emit = defineEmits(["search"]);

defineProps({
  disableInput: Boolean,
});

function search() {
  emit("search", searchQuery.value);
}
</script>

<template>
  <form @submit.prevent="search">
    <div class="form-group">
      <input
        class="form-input"
        v-model="searchQuery"
        placeholder="Enter Github username"
      />
    </div>
    <div class="form-group">
      <button
        class="form-input btn btn-block"
        :disabled="searchQuery.length <= 0 || disableInput"
      >
        Search
      </button>
    </div>
  </form>
</template>

<style scoped></style>
