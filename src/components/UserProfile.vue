<script setup>
import { computed, reactive, ref } from "vue";
import { isEmpty } from "lodash";
import { cleanGraphQLResponse } from "../utils/utils";
import GistList from "../components/GistList.vue";

const activeTab = ref("profile");

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const gists = reactive({
  data: [],
  totalCount: 0,
});

const profile = computed(() => {
  return props.data.user ?? {};
});

gists.totalCount = computed(() => {
  return props.data.user.gists.totalCount;
});

gists.data = computed(() => {
  return cleanGraphQLResponse(props.data.user)?.gists;
});
</script>

<template>
  <div class="panel">
    <div class="panel-header text-center">
      <figure class="avatar avatar-lg">
        <img :src="profile.avatarUrl" alt="Avatar" />
      </figure>
      <div class="panel-title h5 mt-10">{{ profile.login }}</div>
      <div class="panel-subtitle">
        {{ profile.name }}
      </div>
    </div>
    <nav class="panel-nav">
      <ul class="tab tab-block">
        <li class="tab-item" :class="{ active: activeTab === 'profile' }">
          <a @click="activeTab = 'profile'" href="#panels">Profile</a>
        </li>
        <li class="tab-item" :class="{ active: activeTab === 'gists' }">
          <a @click="activeTab = 'gists'" href="#panels">Gists</a>
        </li>
      </ul>
    </nav>
    <div class="panel-body">
      <div v-show="activeTab === 'gists'">
        <GistList :gists="gists.data" />
      </div>
      <div v-show="activeTab === 'profile'">
        <div v-show="!isEmpty(profile.description)" class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">Description</div>
            <div class="tile-subtitle">{{ profile.bio }}</div>
          </div>
        </div>
        <div class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">E-mail</div>
            <div class="tile-subtitle">{{ profile.email }}</div>
          </div>
        </div>
        <div class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">Hireable?</div>
            <div class="tile-subtitle">
              {{ profile.isHirable ? "Yes" : "No" }}
            </div>
          </div>
        </div>
        <div class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">Github Star?</div>
            <div class="tile-subtitle">
              {{ profile.isGitHubStar ? "Yes" : "No" }}
            </div>
          </div>
        </div>
        <div class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">Public repositories</div>
            <div class="tile-subtitle">
              {{ profile.repositories.totalCount }}
            </div>
          </div>
        </div>
        <div class="tile tile-centered">
          <div class="tile-content">
            <div class="tile-title text-bold">Public gists</div>
            <div class="tile-subtitle">
              {{ gists.totalCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer"></div>
  </div>
</template>

<style scoped>
.panel {
  min-height: 400px;
  height: calc(100vh - 3rem);
}
</style>
