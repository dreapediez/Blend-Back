import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { MongooseError } from "mongoose";
import type {
  RegisterData,
  UserCredentials,
  UserTokenPayload,
} from "../../types/userTypes";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import environments from "../../../loadEnvironments.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    const tokenPayload: UserTokenPayload = {
      id: newUser._id.toString(),
      username,
    };

    const token = jwt.sign(tokenPayload, environments.secret);

    res.status(201).json({ accessToken: token });
  } catch (error: unknown) {
    if ((error as MongooseError).message.includes("duplicate key")) {
      const customError = new CustomError(
        "The user already exists",
        409,
        "The user already exists"
      );
      next(customError);
      return;
    }

    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).statusCode ?? 500,
      (error as CustomError).publicMessage || "Something went wrong"
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body as UserCredentials;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new CustomError("User not found", 401, "Wrong credentials");

      next(error);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        "Password is incorrect",
        401,
        "Wrong credentials"
      );
      next(error);
      return;
    }

    const tokenPayload: UserTokenPayload = {
      id: user._id.toString(),
      username,
    };

    const token = jwt.sign(tokenPayload, environments.secret);

    res.status(200).json({ accessToken: token });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).statusCode ?? 500,
      (error as CustomError).publicMessage || "Something went wrong"
    );
    next(customError);
  }
};
