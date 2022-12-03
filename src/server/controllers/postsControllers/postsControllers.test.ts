import { postMock, postsMock } from "../../../mocks/calendarMocks";
import { getAllPosts, getPostById } from "./postsControllers";
import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Post from "../../../database/models/Post";
import type { PostCustomRequest } from "../../types/calendarTypes";
import type { CustomRequest } from "../../types/userTypes";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const next = jest.fn();

describe("Given a getPostById Controller", () => {
  describe("When its rendered with a post id", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;
      const req: Partial<PostCustomRequest> = {
        params: { postId: "6389bb6ddbc8db42cee9ffac" },
      };

      Post.findOne = jest.fn().mockReturnValue(postMock);

      await getPostById(
        req as PostCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ post: postMock });
    });
  });

  describe("When its rendered without a post id", () => {
    test("Then it should return a custom error with status 204 and the message 'No post found'", async () => {
      const req: Partial<PostCustomRequest> = {
        params: { postId: "" },
      };

      Post.findOne = jest.fn().mockReturnValue(null);

      const expectedError = new CustomError(
        "No post found",
        204,
        "Sorry, but there is not a post by that id"
      );

      await getPostById(
        req as PostCustomRequest,
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

      const req: Partial<PostCustomRequest> = {
        params: { postId: "6389bb6ddbc8db42cee9ffac" },
      };

      Post.findOne = jest.fn().mockRejectedValue(Error(""));

      await getPostById(
        req as PostCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a getAllPosts Controller", () => {
  describe("When its rendered with a user id", () => {
    test("Then it should call the response method status with a 200 and it returns a list of posts", async () => {
      const expectedStatus = 200;
      const req: Partial<CustomRequest> = {
        userId: "63849d648dcae285500bac7c",
      };

      Post.find = jest.fn().mockReturnValue(postsMock);

      await getAllPosts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ posts: postsMock });
    });
  });

  describe("When its rendered without a user id", () => {
    test("Then it should return a custom error with status 204 and the message 'No posts found'", async () => {
      const req: Partial<CustomRequest> = {
        userId: "",
      };

      Post.find = jest.fn().mockReturnValue(null);

      const expectedError = new CustomError(
        "No posts found",
        204,
        "Sorry, but there is not a post by that id"
      );

      await getAllPosts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then it should return a next error with status 500 and the message 'No posts found'", async () => {
      const customError = new CustomError(
        "",
        500,
        "Database doesn't work, try again later"
      );

      const req: Partial<CustomRequest> = {
        userId: "63849d648dcae285500bac7c",
      };

      Post.find = jest.fn().mockRejectedValue(Error(""));

      await getAllPosts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
