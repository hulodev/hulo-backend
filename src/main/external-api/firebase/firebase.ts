import * as admin from 'firebase-admin';
import { UnauthorizedError } from '../../utils/errors';

admin.initializeApp();

/**
 * Method to verify firebase token from client
 */
const verifyToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error: unknown) {
    throw new UnauthorizedError(`Token verification failed: ${error}`);
  }
};

export default verifyToken;
