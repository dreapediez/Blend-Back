import express from "express";
import { validate } from "express-validation";
import registerUserSchema from "../../../schemas/registerUserSchema.js";
import {
  loginUser,
  registerUser,
} from "../../controllers/usersControllers/usersControllers.js";
import routes from "../routes.js";

const { registerRoute, loginRoute } = routes;

const usersRouter = express.Router();

usersRouter.post(
  registerRoute,
  validate(registerUserSchema, {}, { abortEarly: false }),
  registerUser
);

usersRouter.post(loginRoute, loginUser);

export default usersRouter;
