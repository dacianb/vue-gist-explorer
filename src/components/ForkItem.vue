<script setup>
import { computed } from "vue";
const props = defineProps({
  fork: {
    type: Object,
    required: true,
  },
});

const createdAt = computed(() => {
  return new Date(props.fork.createdAt).toLocaleString("en-US");
});
</script>

<template>
  <div class="tile">
    <div class="tile-icon">
      <figure
        :data-tooltip="fork.owner.login"
        class="avatar avatar-md tooltip tooltip-right"
      >
        <img :src="fork.owner.avatarUrl" alt="..." />
      </figure>
    </div>
    <div class="tile-content">
      <p class="tile-title">{{ fork.name }}</p>
      <p class="tile-subtitle">Forked on: {{ createdAt }}</p>
    </div>
    <div class="tile-action"></div>
  </div>
</template>
