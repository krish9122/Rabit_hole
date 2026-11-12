import type { RequestHandler } from 'express';
import { HttpError } from '../shared/errors/http-error.js';

export const notFound: RequestHandler = (_request, _response, next) => {
  next(new HttpError(404, 'Route not found'));
};
