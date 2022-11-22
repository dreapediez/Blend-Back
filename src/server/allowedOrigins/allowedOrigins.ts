import environments from "../../loadEnvironments.js";
import type CustomOrigin from "./allowedOriginsTypes.js";

const { allowedOrigins: allowedOriginsList } = environments;

const allowedOrigins: CustomOrigin = (requestOrigin, callback) => {
  if (!requestOrigin || allowedOriginsList.includes(requestOrigin)) {
    callback(null, requestOrigin);
    return;
  }

  const error = new Error("No authorization request origin");

  callback(error);
};

export default allowedOrigins;
