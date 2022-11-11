import { unref } from "vue";

// From here: https://gist.github.com/ManUtopiK/469aec75b655d6a4d912aeb3b75af3c9?permalink_comment_id=3897481#gistcomment-3897481
export function cleanGraphQLResponse(input) {
  input = unref(input);
  if (!input) return null;

  const isPrimitiveType = (test) => {
    return test !== Object(test);
  };

  if (isPrimitiveType(input)) return input;

  const output = {};
  const isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
  };

  Object.keys(input).forEach((key) => {
    if (input[key] && input[key].edges) {
      output[key] = input[key].edges.map((edge) =>
        cleanGraphQLResponse(edge.node)
      );
    } else if (isObject(input[key])) {
      output[key] = cleanGraphQLResponse(input[key]);
    } else if (key !== "__typename") {
      output[key] = input[key];
    }
  });

  return output;
}
