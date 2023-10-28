import { Request, Response, NextFunction } from 'express';
import logger from '../../../main/utils/logger';
import verifyToken from '../../../main/middleware/auth-verification';
import * as firebaseAdmin from 'firebase-admin';

// 1. Mock the entire 'firebase-admin' module.
jest.mock('firebase-admin');
