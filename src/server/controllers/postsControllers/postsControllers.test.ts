import { postMock } from "../../../mocks/calendarMocks";
import { getPost } from "./postsControllers";
import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../../types/userTypes";
import CustomError from "../../../CustomError/CustomError";
import Post from "../../../database/models/Post";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getPost Controller", () => {
  describe("When its rendered with a user id and their post", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;
      const req: Partial<CustomRequest> = {
        userId: postMock.userId.toString(),
      };

      Post.findOne = jest.fn().mockReturnValue(postMock);

      await getPost(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ post: postMock });
    });
  });

  describe("When its rendered without a user id", () => {
    test("Then it should return a custom error with status 204 and the message 'No post found'", async () => {
      const req: Partial<CustomRequest> = {
        userId: "",
      };

      Post.findOne = jest.fn().mockReturnValue(null);

      const expectedError = new CustomError(
        "No post found",
        204,
        "Sorry, but there is not a post by that id"
      );

      await getPost(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then it should return a next error with status 500 and the message 'No post found'", async () => {
      const customError = new CustomError(
        "",
        500,
        "Database doesn't work, try again later"
      );

      const req: Partial<CustomRequest> = {
        userId: postMock.userId.toString(),
      };

      Post.findOne = jest.fn().mockRejectedValue(Error(""));

      await getPost(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
