import * as admin from 'firebase-admin';
import { UnAuthorizedError } from '../../utils/errors';

admin.initializeApp();

const verifyToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error: unknown) {
    throw new UnAuthorizedError(`Token verification failed: ${error}`);
  }
};

export default verifyToken;
