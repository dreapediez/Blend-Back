import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Post from "../../../database/models/Post.js";
import type {
  PostCreateCustomRequest,
  PostCustomRequest,
} from "../../types/calendarTypes.js";
import type { CustomRequest } from "../../types/userTypes.js";

export const getPostById = async (
  req: PostCustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new CustomError(
        "No post found",
        204,
        "Sorry, but there is not a post by that id"
      );
      next(error);
    }

    res.status(200).json({ post });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};

export const getAllPosts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const posts = await Post.find({ userId });

    if (!posts) {
      const error = new CustomError(
        "No posts found",
        204,
        "Sorry, but there is not a posts by that id"
      );
      next(error);
    }

    res.status(200).json({ posts });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};

export const deletePostById = async (
  req: PostCustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      const error = new CustomError(
        "No post found",
        204,
        "Sorry, but there is not a post by that id"
      );
      next(error);
    }

    res.status(200).json(post);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).statusCode ?? 500,
      (error as CustomError).publicMessage ||
        "Database doesn't work, try again later."
    );
    next(customError);
  }
};

export const createNewPost = async (
  req: PostCreateCustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const {
    day,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    image,
    imageBackup,
    createdAt,
  } = req.body;

  try {
    const post = {
      userId,
      day,
      title,
      answer1,
      answer2,
      answer3,
      answer4,
      image,
      imageBackup,
      createdAt,
    };

    const checkPost = await Post.findOne({
      day,
    });
    if (checkPost) {
      const customError = new CustomError(
        "Post already created",
        409,
        "Post already created"
      );
      next(customError);
      return;
    }

    const newPost = await Post.create(post);

    res.status(201).json(newPost);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      400,
      "Error creating the new post"
    );
    next(customError);
  }
};
