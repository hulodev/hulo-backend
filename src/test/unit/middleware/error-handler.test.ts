import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../main/util/app/errors';
import errorHandler from '../../../main/middleware/error-handler';
import logger from '../../../main/util/app/logger';

// mock logger to prevent it from printing entire error in the unknown error test to the console
jest.mock('../../../main/util/app/logger', () => ({
  error: jest.fn()
}));

describe('ErrorHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // mocks chainable methods
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should handle HuloError', () => {
    // given
    const huloError = new BadRequestError();

    // when
    errorHandler(huloError, req as Request, res as Response, next);

    // then
    expect(logger.error).toHaveBeenCalledWith('Bad Request');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
  });

  it('should handle unknown errors', () => {
    // given
    const unknownError = new Error('Random Error');

    // when
    errorHandler(unknownError, req as Request, res as Response, next);

    // then
    expect(logger.error).toHaveBeenCalledWith({ error: unknownError }, 'caught unknown exception');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'an unexpected error occurred' });
  });
});
