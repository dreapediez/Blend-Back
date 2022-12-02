import express from "express";
import { getPost } from "../../controllers/postsControllers/postsControllers.js";
import { auth } from "../../middlewares/auth/auth.js";

import routes from "../routes.js";

const { getPostRouter } = routes;

const postsRouter = express.Router();

postsRouter.get(getPostRouter, auth, getPost);

export default postsRouter;
