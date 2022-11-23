import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import CustomError from "../../CustomError/CustomError.js";
import { userMockCredentials } from "../../mocks/userMocks.js";
import registerUser from "./usersControllers.js";
import User from "../../database/models/User.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

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
