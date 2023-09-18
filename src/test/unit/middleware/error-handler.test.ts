import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../../../main/utils/errors';
import errorHandler from '../../../main/middleware/error-handler';
import logger from '../../../main/utils/logger';

// mock logger to prevent it from printing entire error in the unknown error test to the console
jest.mock('../../../main/utils/logger', () => ({
  warn: jest.fn()
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
    expect(logger.warn).toHaveBeenCalledWith('Bad Request');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
  });

  // todo: this is a temporary test. Please delete after testing dummy-person getAge service
  it('should handle NotFoundError', () => {
    // given
    const notFoundError = new NotFoundError();

    // when
    errorHandler(notFoundError, req as Request, res as Response, next);

    // then
    expect(logger.warn).toHaveBeenCalledWith('Not Found');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
  });

  it('should handle unknown errors', () => {
    // given
    const unknownError = new Error('Random Error');

    // when
    errorHandler(unknownError, req as Request, res as Response, next);

    // then
    expect(logger.warn).toHaveBeenCalledWith({ err: unknownError }, 'caught unknown exception');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'an unexpected error occurred' });
  });
});
