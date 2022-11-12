<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { isEmpty } from "lodash";
import { useQuery } from "@vue/apollo-composable";
import UserProfile from "../components/UserProfile.vue";
import UserSearchForm from "../components/UserSearchForm.vue";
import { PROFILE_WITH_GISTS } from "../queries/github";
import config from "../config";

const username = ref("");
const queryActive = ref(false);
const router = useRouter();

// The default amount of gists to load on request
const gistsToLoad = config.gistsToLoad;

const { result, loading, error } = useQuery(
  PROFILE_WITH_GISTS,
  {
    username: username,
    limit: gistsToLoad,
  },
  () => {
    return {
      enabled: queryActive.value,
    };
  }
);

onMounted(() => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken || accessToken.length < 40) {
    router.push({ name: "api-token" });
  }
});

function searchUser(searchQuery) {
  result.value = {};
  queryActive.value = true;
  username.value = searchQuery;
}
</script>
<template>
  <main>
    <div class="columns">
      <div
        class="column col-3 col-sm-12 col-md-6 col-lg-4 bg-dark left-container"
      >
        <div class="column col-8 col-mx-auto left-content">
          <h2>Vue Gist Explorer</h2>
          <UserSearchForm @search="searchUser" :disable-input="loading" />
          <div class="links text-center">
            <RouterLink :to="{ name: 'api-token' }"
              >Config API token</RouterLink
            >
          </div>
        </div>
      </div>
      <div
        class="column col-8 col-mx-auto col-sm-12 col-md-6 col-lg-8 center-container"
      >
        <div v-if="loading" class="loading loading-lg"></div>

        <div v-if="error" class="toast toast-error">
          {{ error }}
        </div>

        <UserProfile v-if="!isEmpty(result)" :data="result" />
      </div>
    </div>
  </main>
</template>

<style>
.left-container {
  height: 100vh;
}
.left-content {
  margin-top: 40vh;
}
.links {
  margin-top: 2rem;
}

.center-container {
  margin-top: 2rem;
}

.right-container {
  margin-top: 2rem;
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
