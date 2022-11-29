import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import type CustomError from "../../../CustomError/CustomError";

export const notFoundEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const schemaErrors = error.details.body.map(
      (schemaError) => schemaError.message
    );
    error.message = schemaErrors.join(", ");
    error.publicMessage = schemaErrors.join(`\n`);
  }

  const statusCode = error.statusCode ?? 500;
  const message =
    error.publicMessage || "Ops, something went wrong, try again later";

  res.status(statusCode).json(message);
};
