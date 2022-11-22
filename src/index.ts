import connectDatabase from "./database/index.js";
import environments from "./loadEnvironments.js";
import startServer from "./server/index.js";

const { port, mongodb } = environments;

await startServer(+port);
await connectDatabase(mongodb.url);
