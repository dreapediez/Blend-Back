import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../CustomError/CustomError.js";
import {
  userMock,
  userMockCredentials,
  userMockWithId,
} from "../../mocks/userMocks.js";
import User from "../../database/models/User.js";
import { loginUser, registerUser } from "./usersControllers.js";
import environments from "../../loadEnvironments.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

const req: Partial<Request> = {
  body: userMock,
};

describe("Given a registerUser Controller", () => {
  const req: Partial<Request> = {
    body: userMockCredentials,
  };

  describe("When it receives a request with username 'leo', password: 'leo123' and a response", () => {
    test("Then it should return the response method status 201", async () => {
      const expectedStatus = 201;

      const hashedPassword = await bcrypt.hash(
        userMockCredentials.password,
        10
      );

      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);

      User.create = jest
        .fn()
        .mockReturnValue({ ...userMockCredentials, password: hashedPassword });

      await registerUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request and there is an error", () => {
    test("Then it should call next with a custom Error", async () => {
      const error = new CustomError("", 500, "Something went wrong");

      User.create = jest.fn().mockRejectedValue(new Error(""));

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a loginUser Controller", () => {
  describe("When it receives a request with a username 'leo' and password 'leo123' that are in the database", () => {
    test("Then it should respond with status 200, and the json method with the token", async () => {
      const expectedStatus = 200;

      const token = jwt.sign(userMockWithId, environments.secret);

      User.findOne = jest.fn().mockReturnValue(userMockWithId);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      jwt.sign = jest.fn().mockReturnValueOnce(token);

      await loginUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ accessToken: token });
    });
  });

  describe("When it receives username 'leo' that is not in the database", () => {
    test("Then it should call next with a Custom Error with public message 'Wrong credentials' and response status 404", async () => {
      const newCustomError = new CustomError(
        "User not found",
        404,
        "User not found"
      );

      User.findOne = jest.fn().mockReturnValue(null);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newCustomError);
    });
  });

  describe("When it receives a request with an empty body", () => {
    test("Then it should call next with a Custom Error with public message 'Wrong credentials' and response status 401", async () => {
      const newCustomError = new CustomError(
        "User not found",
        401,
        "User not found"
      );

      User.findOne = jest.fn().mockReturnValue(null);

      const req: Partial<Request> = {
        body: {},
      };

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newCustomError);
    });
  });

  describe("When it receives a request with a wrong password", () => {
    test("Then it should call next with a Custom Error with public message 'Password is incorrect' and response status 401", async () => {
      const newCustomError = new CustomError(
        "Password is incorrect",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn().mockReturnValue(userMockWithId);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newCustomError);
    });
  });

  describe("When it receives a request with a wrong password", () => {
    test("Then it should call next with a Custom Error with public message 'Password is incorrect' and response status 401", async () => {
      const newCustomError = new CustomError("", 500, "Something went wrong");

      User.findOne = jest.fn().mockReturnValue(userMockWithId);
      bcrypt.compare = jest.fn().mockRejectedValue(new Error());

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newCustomError);
    });
  });
});
