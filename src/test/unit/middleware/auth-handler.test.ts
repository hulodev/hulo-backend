import { Request, Response, NextFunction } from 'express';
import authToken from '../../../main/middleware/auth-handler';
import { UnauthorizedError } from '../../../main/util/app/errors';
import verifyToken from '../../../main/external-api/firebase/firebase';

// mock firebase verifyToken
jest.mock('../../../main/external-api/firebase/firebase');

describe('AuthHandler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRes = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if Authorization header is missing', async () => {
    // given
    mockReq = {
      headers: {}
    };
    // when
    await authToken(mockReq as Request, mockRes as Response, mockNext);
    // then
    expect(mockNext).toHaveBeenCalledWith(
      new UnauthorizedError('Authorization header is missing or invalid')
    );
  });

  it('should throw an error if Authorization header does not start with Bearer', async () => {
    // given
    mockReq = {
      headers: {
        authorization: 'Invalid token'
      }
    };
    // when
    await authToken(mockReq as Request, mockRes as Response, mockNext);
    // then
    expect(mockNext).toHaveBeenCalledWith(
      new UnauthorizedError('Authorization header is missing or invalid')
    );
  });

  it('should throw an error if token verification fails', async () => {
    // given
    mockReq = {
      headers: {
        authorization: 'Bearer token'
      }
    };
    (verifyToken as jest.Mock).mockRejectedValueOnce(new UnauthorizedError('Unauthorized'));
    //when
    await authToken(mockReq as Request, mockRes as Response, mockNext);
    // then
    expect(mockNext).toHaveBeenCalledWith(new UnauthorizedError('Unauthorized'));
  });

  it('should set userId and call next function if token verification is successful', async () => {
    // given
    mockReq = {
      headers: {
        authorization: 'Bearer token'
      }
    };
    (verifyToken as jest.Mock).mockResolvedValueOnce({ uid: '1234' });
    // when
    await authToken(mockReq as Request, mockRes as Response, mockNext);
    // then
    expect(mockReq.userId).toBe('1234');
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
