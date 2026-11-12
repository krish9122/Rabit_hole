import type { ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';
import { HttpError } from '../shared/errors/http-error.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message = error instanceof HttpError ? error.message : 'Internal server error';

  if (env.NODE_ENV !== 'test') {
    console.error(error);
  }

  response.status(statusCode).json({
    error: {
      code: statusCode === 404 ? 'NOT_FOUND' : statusCode === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message,
    },
  });
};
