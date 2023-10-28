import * as admin from 'firebase-admin';

admin.initializeApp();

const verifyToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};

export default verifyToken;
