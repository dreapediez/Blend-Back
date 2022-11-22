import "../loadEnvironments.js";
import chalk from "chalk";
import debugCreator from "debug";
import app from "./app.js";

const debug = debugCreator("users:server:root");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgMagenta.blue.bold(`Listening on port http://localhost:${port}`)
      );

      resolve(server);
    });

    server.on("error", (error: Error) => {
      debug(chalk.red(`There was an error in server ${error.message}`));

      reject(error);
    });
  });

export default startServer;
