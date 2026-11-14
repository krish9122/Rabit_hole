
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {

  // Handle our custom application errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });

    return;
  }

  // Log unexpected errors for debugging
  console.error("Unexpected Error:", err);

  // Send a generic response to the client
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
};

export { errorMiddleware };
