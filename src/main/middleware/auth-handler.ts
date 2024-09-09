import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../util/app/errors';
//import verifyToken from '../external-api/firebase/firebase';

/**
 * Method to decode token and get userId from the client.
 */
const authHandler = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthorizedError('Authorization header is missing or invalid'));
  } else {
    //const token = authHeader.split('Bearer ')[1];
    try {
      //const decodedToken = await verifyToken(token);
      req.userId = '1234567';
      next();
    } catch (error: unknown) {
      next(error);
    }
  }
};

export default authHandler;
