import Calendar from "../../../database/models/Calendar";
import { calendarMock } from "../../../mocks/calendarMocks";
import { getCalendar } from "./calendarsControllers";
import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../../types/userTypes";
import CustomError from "../../../CustomError/CustomError";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getCalendar Controller", () => {
  describe("When its rendered with a user id and their windows", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;
      const req: Partial<CustomRequest> = {
        userId: calendarMock.userId.toString(),
      };

      Calendar.findOne = jest.fn().mockReturnValue(calendarMock);

      await getCalendar(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ calendar: calendarMock });
    });
  });

  describe("When its rendered without a user id", () => {
    test("Then it should return a custom error with status 204 and the message 'No calendar found'", async () => {
      const req: Partial<CustomRequest> = {
        userId: "",
      };

      Calendar.findOne = jest.fn().mockReturnValue(null);

      const expectedError = new CustomError(
        "No calendar found",
        204,
        "Sorry, but there is not a calendar by that id"
      );

      await getCalendar(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then it should return a next error with status 500 and the message 'No calendar found'", async () => {
      const customError = new CustomError(
        "",
        500,
        "Database doesn't work, try again later"
      );

      const req: Partial<CustomRequest> = {
        userId: calendarMock.userId.toString(),
      };

      Calendar.findOne = jest.fn().mockRejectedValue(Error(""));

      await getCalendar(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
