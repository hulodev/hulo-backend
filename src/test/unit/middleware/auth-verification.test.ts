// mock firebase verifyToken
jest.mock('../../../main/external-api/firebase/firebase-verify-token');

import { Request, Response, NextFunction } from 'express';
import authToken from '../../../main/middleware/auth-verification';
import { UnAuthorizedError } from '../../../main/utils/errors';
import verifyToken from '../../../main/external-api/firebase/firebase-verify-token';

describe('authToken', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
      userId: ''
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  it('should throw an error if Authorization header is missing', async () => {
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      /^Authorization header is missing$/
    );
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      UnAuthorizedError
    );
  });

  it('should throw an error if Authorization header does not start with Bearer', async () => {
    (mockReq as Request).headers.authorization = 'InvalidToken tokenvalue';
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      /^Unknown authentication scheme$/
    );
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      UnAuthorizedError
    );
  });

  it('should throw an error if token verification fails', async () => {
    (mockReq as Request).headers.authorization = 'Bearer tokenvalue';
    (verifyToken as jest.Mock).mockRejectedValueOnce(new Error('Verification Failed'));
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      /^Unauthorized Token$/
    );
    await expect(authToken(mockReq as Request, mockRes as Response, mockNext)).rejects.toThrow(
      UnAuthorizedError
    );
  });

  it('should set userId and call next() if token verification is successful', async () => {
    (mockReq as Request).headers.authorization = 'Bearer tokenvalue';

    (verifyToken as jest.Mock).mockResolvedValueOnce({ uid: '1234' });

    await authToken(mockReq as Request, mockRes as Response, mockNext);

    expect(mockReq.userId).toBe('1234');
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
