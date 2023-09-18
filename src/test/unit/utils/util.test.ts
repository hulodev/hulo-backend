import { NextFunction, Request, Response } from 'express';
import { asyncRoute, AsyncRouteMethodType } from '../../../main/utils/util';

describe('AsyncRoute', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let routeMethod: AsyncRouteMethodType;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // mocks chainable methods
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return result if route resolves successfully', async () => {
    // given
    routeMethod = jest.fn().mockResolvedValueOnce({ message: 'success' });
    const wrappedRoute = asyncRoute(routeMethod);

    // when
    await wrappedRoute(req as Request, res as Response, next);

    // then
    expect(routeMethod).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'success' });
  });

  it('should set status code if status parameter is provided', async () => {
    // given
    routeMethod = jest.fn().mockResolvedValueOnce({ message: 'success' });
    const wrappedRoute = asyncRoute(routeMethod, 201);

    // when
    await wrappedRoute(req as Request, res as Response, next);

    // then
    expect(routeMethod).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'success' });
  });

  it('should call next with error if route fails', async () => {
    // given
    const error = new Error('random error');
    routeMethod = jest.fn().mockRejectedValueOnce(error);
    const wrappedRoute = asyncRoute(routeMethod);

    // when
    await wrappedRoute(req as Request, res as Response, next);

    // then
    expect(next).toHaveBeenCalledWith(error);
  });
});
