import gql from "graphql-tag";

export const PROFILE_WITH_GISTS = gql`
  query ($username: String!, $limit: Int!) {
    user(login: $username) {
      name
      email
      login
      isHireable
      isGitHubStar
      bio
      avatarUrl
      url
      repositories {
        totalCount
      }
      gists(first: $limit, orderBy: { field: CREATED_AT, direction: DESC }) {
        totalCount
        edges {
          node {
            createdAt
            description
            name
            pushedAt
            files {
              name
              size
              extension
              text
              language {
                name
                color
              }
            }
            forks(first: 10) {
              totalCount
              nodes {
                owner {
                  login
                  url
                  avatarUrl
                }
                name
                createdAt
                url
              }
            }
            updatedAt
          }
        }
      }
    }
  }
`;
