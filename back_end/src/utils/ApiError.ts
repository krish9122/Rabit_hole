
class ApiError extends Error {
  statusCode: number;
  data: unknown;
  success: boolean;
  errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    stack: string = "",
    data: unknown = null,
    success: boolean = false
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = data;
    this.success = success;

    this.name = "ApiError";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
