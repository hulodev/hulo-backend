import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../utils/errors';

admin.initializeApp();
const verifyToken = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new UnAuthorizedError('Authorization header is missing');
  if (!authHeader.startsWith('Bearer '))
    throw new UnAuthorizedError('Unknown authentication scheme');

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    throw new UnAuthorizedError('Unauthorized Token');
  }
};

export default verifyToken;
