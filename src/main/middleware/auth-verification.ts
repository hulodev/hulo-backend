import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../utils/errors';
import verifyToken from '../external-api/firebase/firebase-verify-token';

const authToken = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnAuthorizedError('Authorization header is missing');
  }
  if (!authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Unknown authentication scheme');
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await verifyToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    throw new UnAuthorizedError('Unauthorized Token');
  }
};

export default authToken;
