import type { NextFunction, Request } from "express";
import CustomError from "../../../CustomError/CustomError";
import { mockToken } from "../../../mocks/userMocks";
import type { CustomRequest } from "../../types/userTypes";
import { auth } from "./auth";
import jwt from "jsonwebtoken";

beforeEach(() => {
  jest.clearAllMocks();
});

const next = jest.fn();

describe("Given auth middleware", () => {
  describe("When it receives an authorization header at the request with a correct token 'Bearer ...'", () => {
    test("Then it should call next function", () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(mockToken),
      };

      const expectedId = { id: "abc" };
      jwt.verify = jest.fn().mockReturnValueOnce(expectedId);

      auth(req as CustomRequest, null, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a missing authorization header at the request", () => {
    test("Then it should call a Custom Error with public message 'Missing token' and response with status 401", () => {
      const expectedError = new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );

      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      auth(req as CustomRequest, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an un-authorization header at the request", () => {
    test("Then it should call a Custom Error with public message 'Invalid token' and response with status 401", () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(mockToken),
      };

      auth(req as CustomRequest, null, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
