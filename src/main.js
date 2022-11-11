import { createApp, h, provide } from "vue";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import router from "./router";
import App from "./App.vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/stackoverflow-light.css";
import "highlight.js/lib/common";

import "spectre.css/dist/spectre.css";
import "spectre.css/dist/spectre-icons.css";

// Set the Github API token from localstorage
const token = localStorage.getItem("access-token");

// Configure the Apollo HTTP client to use API token
const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: "https://api.github.com/graphql" }),
]);

// Configure the Apollo client
const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

// Create the Vue App and set the Default Apollo Client
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

// Setup Vue plugins
app.use(router);
app.use(hljsVuePlugin);

app.mount("#app");
