<script setup>
import { computed } from "vue";
import { isEmpty } from "lodash";
import FileList from "./FileList.vue";
import ForkList from "./ForkList.vue";

const props = defineProps({
  gist: {
    type: Object,
    required: true,
  },
});

const createdAt = computed(() => {
  return new Date(props.gist.createdAt).toLocaleString("en-US");
});
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <div class="panel-title">
        Gist:
        <a :href="'#' + gist.name">{{ gist.name }}</a>
        <p>
          <small>Created: {{ createdAt }}</small>
        </p>
      </div>
    </div>
    <div class="panel-nav"></div>
    <div class="panel-body">
      <p v-show="!isEmpty(gist.description)">
        <strong>Description: </strong> {{ gist.description }}
      </p>
      <div v-if="gist.forks.totalCount !== 0">
        <p><strong>Forks: </strong></p>
        <ForkList :forks="gist.forks" />
      </div>
      <p><strong>Files: </strong></p>
      <FileList :files="gist.files" />
    </div>
    <div class="panel-footer"></div>
  </div>
</template>

<style scoped>
.panel {
  margin-top: 1rem;
}
</style>
