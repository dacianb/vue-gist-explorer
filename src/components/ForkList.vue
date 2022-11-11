<script setup>
import { computed } from "vue";

const props = defineProps({
  forks: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="columns forks">
    <div class="column col-12">
      <ul>
        <li v-for="fork in forks.nodes" :key="fork.login">
          {{ fork.name }}
          <p>
            {{ fork.createdAt }}
            <figure
              :data-tooltip="fork.owner.login"
              class="avatar avatar-md tooltip tooltip-right"
            >
              <img :src="fork.owner.avatarUrl" alt="..." />
            </figure>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.forks {
  margin-bottom: 1rem;
}
.forks figure {
  margin-right: 10px;
}
</style>
