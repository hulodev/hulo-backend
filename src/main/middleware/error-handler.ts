import { Request, Response, NextFunction } from 'express';
import { HuloError } from '../utils/errors';
import logger from '../utils/logger';

/**
 * Middleware function for handling all errors thrown in the application.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  // if one of our own defined errors, return the error message and status code
  if (err instanceof HuloError) {
    logger.warn(err.message);
    res.status(err.status).json({ error: err.message });
  } else {
    // if an unknown error, return the error for debugging and a 500 status code
    logger.warn({ err }, 'caught unknown exception');
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
};

export default errorHandler;
