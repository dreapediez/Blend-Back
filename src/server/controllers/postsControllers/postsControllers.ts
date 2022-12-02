import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Post from "../../../database/models/Post.js";
import type { CustomRequest } from "../../types/userTypes.js";

export const getPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const post = await Post.findOne({ userId });

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
