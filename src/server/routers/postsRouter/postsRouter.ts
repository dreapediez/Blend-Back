import express from "express";
import {
  getAllPosts,
  getPostById,
  deletePostById,
  createNewPost,
} from "../../controllers/postsControllers/postsControllers.js";
import { auth } from "../../middlewares/auth/auth.js";

import routes from "../routes.js";

const { getPostRouter, deletePost, createPost } = routes;

const postsRouter = express.Router();

postsRouter.get("", auth, getAllPosts);
postsRouter.get(getPostRouter, auth, getPostById);
postsRouter.delete(deletePost, deletePostById);
postsRouter.post(createPost, createNewPost);

export default postsRouter;
