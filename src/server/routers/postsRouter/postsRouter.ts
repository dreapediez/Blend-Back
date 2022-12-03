import express from "express";
import {
  getAllPosts,
  getPost,
} from "../../controllers/postsControllers/postsControllers.js";
import { auth } from "../../middlewares/auth/auth.js";

import routes from "../routes.js";

const { getPostRouter } = routes;

const postsRouter = express.Router();

postsRouter.get("", auth, getAllPosts);
postsRouter.get(getPostRouter, auth, getPost);

export default postsRouter;
