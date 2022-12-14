import { postMock, postsMock } from "../../../mocks/calendarMocks";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
} from "./postsControllers";
import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Post from "../../../database/models/Post";
import type {
  PostCreateCustomRequest,
  PostCustomRequest,
} from "../../types/calendarTypes";
import type { CustomRequest } from "../../types/userTypes";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

afterEach(() => {
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

describe("Given a deletePostById Controller", () => {
  describe("When it receives a response with an id to remove", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;
      const req: Partial<PostCustomRequest> = {
        params: { postId: "6389bb6ddbc8db42cee9ffab" },
      };

      Post.findByIdAndDelete = jest.fn().mockReturnValue(postMock);

      await deletePostById(
        req as PostCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an unexistent id to remove", () => {
    test("Then it should return a custom error with status 204 and the message 'No post found'", async () => {
      const req: Partial<PostCustomRequest> = {
        params: { postId: "" },
      };

      Post.findByIdAndDelete = jest.fn().mockReturnValue(null);

      const expectedError = new CustomError(
        "No post found",
        204,
        "Sorry, but there is not a post by that id"
      );

      await deletePostById(
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

      Post.findByIdAndDelete = jest.fn().mockRejectedValue(Error(""));

      await deletePostById(
        req as PostCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a createPost Controller", () => {
  const req: Partial<PostCreateCustomRequest> = {
    userId: "63849d648dcae285500bac7c",
    body: postMock,
  };
  describe("When it receives a response to create a new post with a day parameter that alreay exists", () => {
    test("Then it should call the response method status with a 404, and the json method", async () => {
      const customError = new CustomError(
        "Post already created",
        409,
        "Post already created"
      );

      Post.findOne = jest.fn().mockReturnValue(postMock);

      await createNewPost(
        req as PostCreateCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("Given a createPost Controller", () => {
    describe("When it receives a response to create a new post", () => {
      test("Then it should call the response method status with a 201, and the json method", async () => {
        const expectedStatus = 201;

        Post.findOne = jest.fn().mockReturnValue(null);
        Post.create = jest.fn().mockReturnValue(postMock);

        await createNewPost(
          req as PostCreateCustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalled();
      });
    });
  });

  describe("When it receives a response to create a new post and it has an error", () => {
    test("Then it should call the response method status with a 400, and the json method", async () => {
      const generalError = new CustomError(
        "",
        400,
        "Error creating the new post"
      );

      Post.findOne = jest.fn().mockReturnValue(null);
      Post.create = jest.fn().mockRejectedValue(new Error());

      await createNewPost(
        req as PostCreateCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(generalError);
    });
  });
});
