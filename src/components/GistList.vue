<script setup>
import GistItem from "./GistItem.vue";
defineProps({
  gists: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="gist-list">
    <GistItem v-for="gist in gists" :key="gist.name" :gist="gist" />
  </div>
</template>
