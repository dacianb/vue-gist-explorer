<script setup>
import { onMounted, ref } from "vue";

const token = ref("");

onMounted(() => {
  const accessToken = localStorage.getItem("access-token");
  if (accessToken !== null) {
    token.value = accessToken;
  }
});

function save() {
  if (token.value !== "" || token.value.length < 40) {
    localStorage.setItem("access-token", token.value);

    // Use this redirect method instead of router to make a full page reload and set the token for Apollo
    window.location.href = "/";
  }
}
</script>
<template>
  <main>
    <div class="columns">
      <div class="column col-4 col-mx-auto">
        <h2>Github API token</h2>
        <p>
          For this application to work you need to provide a Github API token!
        </p>
        <p>To generate a new token please follow the instructions:</p>
        <ol>
          <li>
            Please go to
            <a href="https://github.com/settings/tokens" target="_blank"
              >github.com/settings/tokens</a
            >;
          </li>
          <li>
            Click on "Generate new token" button on the right side of the page;
          </li>
          <li>Click on "Generate new token (classic)" option;</li>
          <li>Write a "Note" (Ex: gist-explorer);</li>
          <li>
            Scroll down to "user" section and check *"read:user" and
            *"user:email";
          </li>
          <li>Click on "Generate token" button at the buttom of the page;</li>
          <li>
            Copy the generated token string (40 characters) and paste it in the
            form below.
          </li>
        </ol>
        <p>
          * - These options are needed to display the github user profile
          information
        </p>
      </div>
      <div class="column col-4 col-mx-auto">
        <form class="form-horizontal" @submit.prevent="save">
          <div class="form-group">
            <label class="form-label" for="api-token">API token</label>
            <textarea
              id="api-token"
              class="form-input"
              v-model="token"
              cols="30"
              rows="10"
              placeholder="ghp_ECZIJuquBUq1taFG2JA..."
            ></textarea>
          </div>

          <div class="input-group">
            <button class="btn btn-primary">Save token</button>
            <a class="btn btn-link" href="/">Return Home</a>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  padding-top: 2rem;
}
</style>
