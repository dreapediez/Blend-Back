import express from "express";
import { validate } from "express-validation";
import registerUserSchema from "../../schemas/registerUserSchema.js";
import registerUser from "../controllers/usersControllers.js";
import routes from "./routes.js";

const { registerRoute } = routes;

const usersRouter = express.Router();

usersRouter.post(
  registerRoute,
  validate(registerUserSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
