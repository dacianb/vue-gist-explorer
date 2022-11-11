# Vue Gist Explorer

## About

Demo app project for the Smart Impact IT PHP developer job interview.

## How to run

**Prerequisites:**

- nodejs v16 or above;
- NPM v8.15 or above;

1. Clone the repo to your local machine;
2. Open a terminal and navigate to the cloned repository folder and run: `npm install`;
3. After all the required packages were installed run: `npm run dev`;
4. Access the URL listed in the terminal to view the app locally;

## Project requirements

Create a single page application (a web page) using your preferred frontend framework (React, Vue, Angular, etc), that will use the Github Gists API to display the gists for a Github user (https://docs.github.com/en/rest/gists/gists#list-gists-for-a-user).

1. There will be an input for the username of the Github user.

2. You will load some info about this username (image, name, description) and also their public gists.

3. Their gists will be loaded with

   1. their title, date of creation;
   2. their programming language as a colored badge;
   3. a list of their forks and the users that forked them.

4. On click, the gist will be loaded in a syntax-highlighted code viewer.

5. Optimize the page for performance.

Other features are also nice to have, but the focus should be on the items above.

## Design considerations:

### API rate limiting

Almost all public API have some kind of rate limitig function (limiting the number of request a IP can have per hour/minute/second). Github REST API documentation specifies:

_"For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the person making requests."_ [1](https://docs.github.com/en/rest/overview/resources-in-the-rest-api)

As per the project requirement 3.iii the data needed to show the forks and users is not provided in the "list-gist-for-a-user" endpoint. To get the necessary data there is a need to run subsequent requests to [list-gist-forks](https://docs.github.com/en/rest/gists/gists#list-gist-forks) endpoint for additional data.

Second related to requirement 4. is the loading of files contents, witch also requires subsequent requests to [get-a-gist](https://docs.github.com/en/rest/gists/gists#get-a-gist) endpoint.

## References

- https://vuejs.org/guide
- https://v4.apollo.vuejs.org
- https://docs.github.com/en/graphql/overview/explorer
- https://highlightjs.org/
- https://medium.com/@anoob.bava/how-to-use-the-github-graphql-api-in-vue-js-with-vue-apollo-24304b6731cf
- https://www.endorlabs.com/blog/how-to-get-the-most-out-of-github-api-rate-limits
- https://www.newline.co/@kchan/building-a-graphql-application-with-vue-3-and-apollo--4679b402
- https://picturepan2.github.io/spectre
