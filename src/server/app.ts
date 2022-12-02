import "../loadEnvironments.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import allowedOrigins from "./allowedOrigins/allowedOrigins.js";
import { generalError } from "./middlewares/errors/errors.js";
import usersRouter from "./routers/usersRouter/usersRouter.js";
import postsRouter from "./routers/postsRouter/postsRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res, next) => {
  res.json({
    message: "Pong 🏓",
  });

  next();
});

app.use(generalError);

export default app;
