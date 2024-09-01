import { asyncRoute } from '../util/app/util';
import { getLocation } from '../controller/user-controller';
import { Router } from 'express';

/**
 * This file contains application routes that need to bypass authentication.
 */
const app = Router();

app.post('/user/location', asyncRoute(getLocation));

export default app;
