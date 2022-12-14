import "../loadEnvironments.js";
import chalk from "chalk";
import debugCreator from "debug";
import mongoose from "mongoose";

const debug = debugCreator("users:databasemongodb:root");

const connectDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl, { dbName: "blend" });
    debug(chalk.blue("Connected to database"));
  } catch (error: unknown) {
    debug(chalk.red(`Error on connection`, (error as Error).message));
  }

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;

      return ret;
    },
  });
};

export default connectDatabase;
