<script setup>
import ForkItem from "./ForkItem.vue";

defineProps({
  forks: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="columns forks">
    <div class="column col-12">
      <ForkItem v-for="fork in forks.nodes" :key="fork.login" :fork="fork" />
    </div>
  </div>
</template>

<style scoped>
.forks {
  margin-bottom: 1rem;
}
</style>
