import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../utils/errors';
import verifyToken from '../external-api/firebase/firebase-verify-token';

const authToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnAuthorizedError('Authorization header is missing or invalid'));
  } else {
    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await verifyToken(token);
      req.userId = decodedToken.uid;
      next();
    } catch (error: unknown) {
      next(error);
    }
  }
};

export default authToken;
