import connectMongodb from "./mongodb/index.js";
import environments from "./loadEnvironments.js";
import startServer from "./server/index.js";

const { port, mongodb } = environments;

await startServer(+port);
await connectMongodb(mongodb.url);
