
import type { RequestHandler } from "express";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";

const validate = (schema: z.ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new ApiError(400, "Validation failed", errors)
      );
    }

    // Replace request body with validated data
    req.body = result.data;

    next();
  };
};

export { validate };
