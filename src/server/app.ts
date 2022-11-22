import "../loadEnvironments.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://202209-final-project-andrea-pedreno.netlify.app",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.get("/", (req, res, next) => {
  res.json({
    message: "Pong 🏓",
  });

  next();
});

export default app;
