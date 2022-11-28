import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import environments from "../../../loadEnvironments.js";
import type { CustomRequest, UserTokenPayload } from "../../types/userTypes";

const { secret } = environments;

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );
      next(error);
      return;
    }

    const token = authHeader.replace(/^Bearer \s*/, "");

    const user: UserTokenPayload = jwt.verify(
      token,
      secret
    ) as UserTokenPayload;

    req.userId = user.id;

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token"
    );
    next(tokenError);
  }
};
