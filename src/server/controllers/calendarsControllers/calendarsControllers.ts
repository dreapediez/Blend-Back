import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Calendar from "../../../database/models/Calendar.js";
import type { CustomRequest } from "../../types/userTypes.js";

export const getCalendar = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const calendar = await Calendar.findOne({ userId });

    if (!calendar) {
      const error = new CustomError(
        "No calendar found",
        204,
        "Sorry, but there is not a calendar by that id"
      );
      next(error);
    }

    res.status(200).json({ calendar });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};
