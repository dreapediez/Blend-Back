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
    const calendars = await Calendar.findOne({ userId });

    if (!calendars) {
      res.status(204).json({ message: "No calendar found." });
      return;
    }

    res.status(200).json({ calendars });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};
